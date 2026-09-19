from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from config import N8N_SECRET
from database import get_db

router = APIRouter(tags=["risk-assessment"])


@router.post("/api/webhooks/n8n/risk-assessment")
def n8n_callback(
    payload: schemas.RiskAssessmentCallback,
    db: Session = Depends(get_db),
    x_n8n_secret: str = Header(default=None, alias="X-N8N-SECRET"),
):
    if x_n8n_secret != N8N_SECRET:
        raise HTTPException(status_code=403, detail="forbidden")

    application = db.get(models.LoanApplication, payload.application_id)
    if not application:
        raise HTTPException(status_code=404, detail="application not found")

    assessment = application.risk_assessment
    if assessment is None:
        assessment = models.RiskAssessment(application_id=application.id)
        db.add(assessment)

    assessment.risk_score = payload.risk_score
    assessment.risk_level = payload.risk_level
    assessment.ai_reasoning = payload.reasoning
    assessment.raw_ai_response = payload.model_dump()
    assessment.policy_reference = payload.policy_reference

    application.status = "assessed"
    db.commit()
    return {"status": "ok"}


@router.get(
    "/api/loan-applications/{application_id}/risk-assessment",
    response_model=schemas.RiskAssessmentOut,
)
def get_risk_assessment(application_id: int, db: Session = Depends(get_db)):
    application = db.get(models.LoanApplication, application_id)
    if not application or application.risk_assessment is None:
        raise HTTPException(status_code=404, detail="not assessed yet")

    a = application.risk_assessment
    raw = a.raw_ai_response or {}
    return schemas.RiskAssessmentOut(
        risk_score=a.risk_score,
        risk_level=a.risk_level,
        reasoning=a.ai_reasoning,
        policy_reference=a.policy_reference,
        retrieved_policies=raw.get("retrieved_policies", []),
    )
