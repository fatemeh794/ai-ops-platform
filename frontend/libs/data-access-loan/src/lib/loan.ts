import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api-base-url';
import {
  ApplicantCreate,
  ApplicantOut,
  LoanApplicationCreate,
  LoanApplicationOut,
  SubmitForAssessmentResponse,
} from './models';

// Reads (GET) go through `httpResource` directly where they're used (see
// FeatureLoanDashboard) — the Angular team's guidance is to prefer
// `httpResource` for reads and `HttpClient` only for mutations.
@Service()
export class LoanService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_BASE_URL);

  createApplicant(payload: ApplicantCreate): Observable<ApplicantOut> {
    return this.http.post<ApplicantOut>(`${this.apiUrl}/applicants/`, payload);
  }

  createLoanApplication(
    payload: LoanApplicationCreate,
  ): Observable<LoanApplicationOut> {
    return this.http.post<LoanApplicationOut>(
      `${this.apiUrl}/loan-applications/`,
      payload,
    );
  }

  submitForAssessment(id: number): Observable<SubmitForAssessmentResponse> {
    return this.http.post<SubmitForAssessmentResponse>(
      `${this.apiUrl}/loan-applications/${id}/submit-for-assessment`,
      {},
    );
  }
}
