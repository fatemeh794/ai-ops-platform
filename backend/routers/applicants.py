from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db

router = APIRouter(prefix="/api/applicants", tags=["applicants"])


@router.post("/", response_model=schemas.ApplicantOut, status_code=201)
def create_applicant(payload: schemas.ApplicantCreate, db: Session = Depends(get_db)):
    applicant = models.Applicant(**payload.model_dump())
    db.add(applicant)
    db.commit()
    db.refresh(applicant)
    return applicant
