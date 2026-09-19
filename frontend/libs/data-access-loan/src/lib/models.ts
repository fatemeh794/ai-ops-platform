// Mirrors backend/schemas.py — keep these in sync with the FastAPI Pydantic models.

export interface ApplicantCreate {
  full_name: string;
  national_id: string;
  monthly_income: number;
  job_title?: string;
}

export interface ApplicantOut extends ApplicantCreate {
  id: number;
}

export interface CollateralIn {
  asset_type: string;
  estimated_value: number;
}

export interface LoanApplicationCreate {
  applicant_id: number;
  requested_amount: number;
  repayment_months: number;
  collaterals?: CollateralIn[];
}

export interface LoanApplicationOut {
  id: number;
  applicant_id: number;
  requested_amount: number;
  repayment_months: number;
  status: string;
}

export interface RetrievedPolicy {
  text: string;
  source?: string | null;
  score?: number | null;
}

export interface RiskAssessmentOut {
  risk_score?: number | null;
  risk_level?: string | null;
  reasoning?: string | null;
  policy_reference?: string | null;
  retrieved_policies?: RetrievedPolicy[];
}

export interface SubmitForAssessmentResponse {
  status: string;
}
