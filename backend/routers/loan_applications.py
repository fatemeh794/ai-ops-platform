import requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from config import N8N_WEBHOOK_URL
from database import get_db

router = APIRouter(prefix="/api/loan-applications", tags=["loan-applications"])


@router.post("/", response_model=schemas.LoanApplicationOut, status_code=201)
def create_application(payload: schemas.LoanApplicationCreate, db: Session = Depends(get_db)):
    application = models.LoanApplication(
        applicant_id=payload.applicant_id,
        requested_amount=payload.requested_amount,
        repayment_months=payload.repayment_months,
    )
    db.add(application)
    db.flush()  # تا application.id قبل از commit در دسترس باشه

    for c in payload.collaterals:
        db.add(
            models.CollateralAsset(
                application_id=application.id,
                asset_type=c.asset_type.value,
                estimated_value=c.estimated_value,
            )
        )

    db.commit()
    db.refresh(application)
    return application


@router.get("/{application_id}", response_model=schemas.LoanApplicationOut)
def get_application(application_id: int, db: Session = Depends(get_db)):
    application = db.get(models.LoanApplication, application_id)
    if not application:
        raise HTTPException(status_code=404, detail="not found")
    return application


@router.post("/{application_id}/submit-for-assessment")
def submit_for_assessment(application_id: int, db: Session = Depends(get_db)):
    application = db.get(models.LoanApplication, application_id)
    if not application:
        raise HTTPException(status_code=404, detail="not found")

    application.status = "assessing"
    db.commit()

    payload = {
        "application_id": application.id,
        "requested_amount": str(application.requested_amount),
        "repayment_months": application.repayment_months,
        "monthly_income": str(application.applicant.monthly_income),
        "collaterals": [
            {"type": c.asset_type, "value": str(c.estimated_value)}
            for c in application.collaterals
        ],
    }
    requests.post(N8N_WEBHOOK_URL, json=payload, timeout=10)
    return {"status": "assessing"}
