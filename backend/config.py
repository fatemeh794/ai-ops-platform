import os

DATABASE_URL = os.environ.get(
    "DATABASE_URL", "postgresql://loans:loans@db:5432/loans"
)

N8N_WEBHOOK_URL = os.environ.get(
    "N8N_WEBHOOK_URL", "http://n8n:5678/webhook/loan-risk-assessment"
)

N8N_SECRET = os.environ.get("N8N_SECRET", "change-me-secret")
