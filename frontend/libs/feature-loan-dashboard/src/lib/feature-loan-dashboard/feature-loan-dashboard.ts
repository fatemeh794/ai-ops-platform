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
import { I18nService, Icon, IconBadge } from '@frontend/ui-shared';

const POLL_INTERVAL_MS = 3000;
const MAX_AUTO_POLLS = 10;

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
}
