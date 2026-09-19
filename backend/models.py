from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


class Applicant(Base):
    __tablename__ = "applicants"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    national_id = Column(String, nullable=False)
    monthly_income = Column(Numeric, nullable=False)
    job_title = Column(String, nullable=True)

    applications = relationship(
        "LoanApplication", back_populates="applicant", cascade="all, delete"
    )


class LoanApplication(Base):
    __tablename__ = "loan_applications"

    id = Column(Integer, primary_key=True, index=True)
    applicant_id = Column(Integer, ForeignKey("applicants.id", ondelete="CASCADE"))
    requested_amount = Column(Numeric, nullable=False)
    repayment_months = Column(Integer, nullable=False)
    status = Column(String, default="pending", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    applicant = relationship("Applicant", back_populates="applications")
    collaterals = relationship(
        "CollateralAsset", back_populates="application", cascade="all, delete"
    )
    risk_assessment = relationship(
        "RiskAssessment",
        back_populates="application",
        uselist=False,
        cascade="all, delete",
    )


class CollateralAsset(Base):
    __tablename__ = "collateral_assets"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("loan_applications.id", ondelete="CASCADE"))
    asset_type = Column(String, nullable=False)
    estimated_value = Column(Numeric, nullable=False)

    application = relationship("LoanApplication", back_populates="collaterals")


class RiskAssessment(Base):
    __tablename__ = "risk_assessments"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(
        Integer, ForeignKey("loan_applications.id", ondelete="CASCADE"), unique=True
    )
    risk_score = Column(Integer, nullable=True)
    risk_level = Column(String, nullable=True)
    ai_reasoning = Column(Text, nullable=True)
    raw_ai_response = Column(JSON, nullable=True)
    policy_reference = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    application = relationship("LoanApplication", back_populates="risk_assessment")
