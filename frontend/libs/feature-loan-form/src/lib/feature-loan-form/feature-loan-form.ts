import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormField,
  applyEach,
  form,
  min,
  required,
  submit,
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoanService } from '@frontend/data-access-loan';
import { I18nService, Icon } from '@frontend/ui-shared';

interface CollateralModel {
  asset_type: string;
  estimated_value: number;
}

interface LoanFormModel {
  full_name: string;
  national_id: string;
  monthly_income: number;
  job_title: string;
  requested_amount: number;
  repayment_months: number;
  collaterals: CollateralModel[];
}

@Component({
  selector: 'lib-feature-loan-form',
  imports: [FormField, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feature-loan-form.html',
  styleUrl: './feature-loan-form.css',
})
export class FeatureLoanForm {
  private readonly loanService = inject(LoanService);
  private readonly router = inject(Router);
  protected readonly i18n = inject(I18nService);

  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  // CRITICAL (per Signal Forms): never seed the model with null/undefined —
  // '' for text, 0 for numbers, [] for arrays.
  protected readonly model = signal<LoanFormModel>({
    full_name: '',
    national_id: '',
    monthly_income: 0,
    job_title: '',
    requested_amount: 0,
    repayment_months: 0,
    collaterals: [],
  });

  protected readonly loanForm = form(this.model, (p) => {
    required(p.full_name);
    required(p.national_id);
    min(p.monthly_income, 1);
    min(p.requested_amount, 1);
    min(p.repayment_months, 1);

    applyEach(p.collaterals, (c) => {
      required(c.asset_type);
      min(c.estimated_value, 1);
    });
  });

  protected addCollateral(): void {
    this.model.update((m) => ({
      ...m,
      collaterals: [...m.collaterals, { asset_type: '', estimated_value: 0 }],
    }));
  }

  protected removeCollateral(index: number): void {
    this.model.update((m) => ({
      ...m,
      collaterals: m.collaterals.filter((_, i) => i !== index),
    }));
  }

  // Every built-in Signal Forms validator sets an error `kind` ('required',
  // 'min', ...); we translate on read so switching language stays live even
  // though the schema itself only runs once, at construction.
  protected fieldError(errors: readonly { kind: string; message?: string }[]): string {
    if (!errors.length) return '';
    return errors[0].kind === 'min'
      ? this.i18n.t('form.error.min')
      : this.i18n.t('form.error.required');
  }

  protected onSubmit(): void {
    submit(this.loanForm, async () => {
      this.errorMessage.set(null);
      this.submitting.set(true);

      try {
        const value = this.model();

        const applicant = await firstValueFrom(
          this.loanService.createApplicant({
            full_name: value.full_name,
            national_id: value.national_id,
            monthly_income: value.monthly_income,
            job_title: value.job_title || undefined,
          }),
        );

        const application = await firstValueFrom(
          this.loanService.createLoanApplication({
            applicant_id: applicant.id,
            requested_amount: value.requested_amount,
            repayment_months: value.repayment_months,
            collaterals: value.collaterals,
          }),
        );

        await firstValueFrom(this.loanService.submitForAssessment(application.id));

        this.submitting.set(false);
        this.router.navigate(['/applications', application.id]);
      } catch {
        this.submitting.set(false);
        this.errorMessage.set(this.i18n.t('form.error.generic'));
      }
    });
  }
}
