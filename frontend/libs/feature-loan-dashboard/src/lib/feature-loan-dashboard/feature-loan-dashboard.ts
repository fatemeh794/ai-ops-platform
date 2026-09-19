import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {
  API_BASE_URL,
  LoanApplicationOut,
  RiskAssessmentOut,
} from '@frontend/data-access-loan';
import { I18nService, Icon, IconBadge, IconName } from '@frontend/ui-shared';

const POLL_INTERVAL_MS = 3000;
const MAX_AUTO_POLLS = 10;

// Derived from rag/policies/risk-tiers.md: low risk is auto-approvable,
// medium needs a credit officer's manual review, high is rejected by
// default. Kept as a plain mapping here (rather than another backend call)
// since the dashboard already has `risk_level` from the assessment.
type Outcome = 'approved' | 'review' | 'rejected';

type StepState = 'done' | 'current' | 'upcoming' | 'rejected';

interface RoadmapStep {
  key: string;
  state: StepState;
}

const STEP_ICON: Record<StepState, IconName> = {
  done: 'check-circle',
  current: 'clock',
  upcoming: 'clock',
  rejected: 'x-circle',
};

@Component({
  selector: 'lib-feature-loan-dashboard',
  imports: [RouterLink, Icon, IconBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feature-loan-dashboard.html',
  styleUrl: './feature-loan-dashboard.css',
})
export class FeatureLoanDashboard {
  // bound from the route param `:id` via withComponentInputBinding()
  readonly id = input.required<string>();

  private readonly apiUrl = inject(API_BASE_URL);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly i18n = inject(I18nService);

  // Reads go through httpResource — it fetches reactively whenever `id()`
  // changes and exposes status/value/error as plain signals, no manual
  // subscribe/unsubscribe bookkeeping.
  protected readonly application = httpResource<LoanApplicationOut>(
    () => `${this.apiUrl}/loan-applications/${this.id()}`,
  );

  protected readonly assessment = httpResource<RiskAssessmentOut>(
    () => `${this.apiUrl}/loan-applications/${this.id()}/risk-assessment`,
  );

  protected readonly notFound = computed(() => !!this.application.error());
  protected readonly initialLoading = computed(
    () => this.application.isLoading() && !this.application.hasValue(),
  );
  protected readonly pending = computed(
    () => this.application.hasValue() && !this.assessment.hasValue(),
  );

  protected readonly sortedPolicies = computed(() => {
    const policies = this.assessment.value()?.retrieved_policies ?? [];
    return [...policies].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  });

  // low -> approved, high -> rejected, medium (or anything unexpected) ->
  // treated as needing manual review, which is the safe default.
  protected readonly outcome = computed<Outcome>(() => {
    const level = this.assessment.value()?.risk_level;
    if (level === 'low') return 'approved';
    if (level === 'high') return 'rejected';
    return 'review';
  });

  // The first four steps of Vency's real loan process (ثبت‌نام، درخواست
  // وام، بررسی ضمانت، احراز هویت و اعتبارسنجی) are already behind the
  // applicant by the time an assessment exists; what's shown after that
  // forks on the AI's risk tier.
  protected readonly roadmapSteps = computed<RoadmapStep[]>(() => {
    const base: RoadmapStep[] = [
      { key: 'register', state: 'done' },
      { key: 'apply', state: 'done' },
      { key: 'collateral', state: 'done' },
      { key: 'verify', state: 'done' },
    ];

    switch (this.outcome()) {
      case 'approved':
        return [
          ...base,
          { key: 'contract', state: 'current' },
          { key: 'disbursement', state: 'upcoming' },
        ];
      case 'review':
        return [
          ...base,
          { key: 'manual_review', state: 'current' },
          { key: 'decision', state: 'upcoming' },
        ];
      case 'rejected':
        return [...base, { key: 'rejected', state: 'rejected' }];
    }
  });

  // Only shown for a rejected outcome — concrete, policy-grounded actions
  // (not generic advice): matches the levers rag/policies/collateral-
  // requirements.md and debt-to-income.md actually score on.
  protected readonly rejectionTips = ['coverage', 'amount', 'term'] as const;

  private pollCount = 0;

  constructor() {
    // n8n processes the assessment asynchronously (fire-and-forget webhook),
    // so the first read after submit is usually a 404. While that's the
    // case, auto-retry every few seconds, capped at MAX_AUTO_POLLS — after
    // that the person can still hit "check again" by hand.
    effect((onCleanup) => {
      const stillWaiting = this.pending() && !this.assessment.isLoading();
      if (!stillWaiting || !isPlatformBrowser(this.platformId) || this.pollCount >= MAX_AUTO_POLLS) {
        return;
      }

      const timer = setTimeout(() => {
        this.pollCount += 1;
        this.assessment.reload();
      }, POLL_INTERVAL_MS);

      onCleanup(() => clearTimeout(timer));
    });
  }

  protected refresh(): void {
    this.pollCount = 0;
    this.assessment.reload();
  }

  protected matchPercent(score: number | null | undefined): number {
    if (score === null || score === undefined) return 0;
    return Math.round(Math.max(0, Math.min(1, score)) * 100);
  }

  protected stepIcon(state: StepState): IconName {
    return STEP_ICON[state];
  }
}
