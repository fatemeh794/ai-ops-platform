from typing import List

from fastapi import APIRouter

import schemas
from collateral_types import COLLATERAL_TYPES

router = APIRouter(prefix="/api/collateral-types", tags=["collateral-types"])


@router.get("/", response_model=List[schemas.CollateralTypeOut])
def list_collateral_types():
  
    return COLLATERAL_TYPES
