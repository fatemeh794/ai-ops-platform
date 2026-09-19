from typing import List

from fastapi import APIRouter

import schemas
from collateral_types import COLLATERAL_TYPES

router = APIRouter(prefix="/api/collateral-types", tags=["collateral-types"])


@router.get("/", response_model=List[schemas.CollateralTypeOut])
def list_collateral_types():
    """
    Canonical list of collateral types the frontend should offer as a
    dropdown (rather than a free-text field). Keeping this server-driven
    means the value stored, the value validated by `CollateralIn`, and the
    exact wording the n8n RAG workflow uses to build its retrieval query
    all come from one place.
    """
    return COLLATERAL_TYPES
