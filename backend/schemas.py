from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class ApplicantCreate(BaseModel):
    full_name: str
    national_id: str
    monthly_income: float
    job_title: Optional[str] = None


class ApplicantOut(BaseModel):
    id: int
    full_name: str
    national_id: str
    monthly_income: float
    job_title: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class CollateralIn(BaseModel):
    asset_type: str
    estimated_value: float


class LoanApplicationCreate(BaseModel):
    applicant_id: int
    requested_amount: float
    repayment_months: int
    collaterals: List[CollateralIn] = []


class LoanApplicationOut(BaseModel):
    id: int
    applicant_id: int
    requested_amount: float
    repayment_months: int
    status: str

    model_config = ConfigDict(from_attributes=True)


class RiskAssessmentCallback(BaseModel):
    application_id: int
    risk_score: int
    risk_level: str
    reasoning: str
    policy_reference: Optional[str] = None


class RiskAssessmentOut(BaseModel):
    risk_score: Optional[int] = None
    risk_level: Optional[str] = None
    reasoning: Optional[str] = None
    policy_reference: Optional[str] = None
