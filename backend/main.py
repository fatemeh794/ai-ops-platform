from fastapi import FastAPI

from database import Base, engine
import models  # noqa: F401  (باید قبل از create_all ایمپورت بشه تا جدول‌ها روی Base ثبت بشن)
from routers import applicants, loan_applications, risk_assessments

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Loan Pre-Assessment API",
    description="سیستم پیش‌ارزیابی درخواست وام — نمونه‌کار Django/Angular/n8n",
    version="1.0.0",
)

app.include_router(applicants.router)
app.include_router(loan_applications.router)
app.include_router(risk_assessments.router)


@app.get("/", tags=["health"])
def health_check():
    return {"status": "ok"}
