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

// Mirrors backend/collateral_types.py's CollateralType enum + COLLATERAL_TYPES
// list, served by GET /collateral-types/. `value` is what gets stored on
// `CollateralIn.asset_type` and is also the exact code the n8n RAG workflow's
// COLLATERAL_LABELS lookup uses — keep all three in sync.
export interface CollateralType {
  value: string;
  label_fa: string;
  label_en: string;
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
