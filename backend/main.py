from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
import models  # noqa: F401  (باید قبل از create_all ایمپورت بشه تا جدول‌ها روی Base ثبت بشن)
from routers import applicants, collateral_types, loan_applications, risk_assessments

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Loan Pre-Assessment API",
    description="سیستم پیش‌ارزیابی درخواست وام — نمونه‌کار Django/Angular/n8n",
    version="1.0.0",
)

# Allow the Angular dev server (a different origin: localhost:4200) to call
# this API (localhost:8000) from the browser. Without this, every request
# from LoanService fails at the browser's CORS check before it even reaches
# these routes.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applicants.router)
app.include_router(collateral_types.router)
app.include_router(loan_applications.router)
app.include_router(risk_assessments.router)


@app.get("/", tags=["health"])
def health_check():
    return {"status": "ok"}
