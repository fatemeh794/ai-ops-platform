"""
Canonical collateral ("guarantee") types this system accepts.

"""

from enum import Enum


class CollateralType(str, Enum):
    SAYAD_CHECK = "sayad_check"
    SALARY_DEDUCTION = "salary_deduction"
    INVESTMENT_FUND = "investment_fund"
    GOLD = "gold"
    SILVER = "silver"
    CRYPTO = "crypto"


# label_fa MUST match the exact wording used in rag/policies/collateral-requirements.md
COLLATERAL_TYPES: list[dict] = [
    {
        "value": CollateralType.SAYAD_CHECK.value,
        "label_fa": "چک صیادی",
        "label_en": "Sayad-registered check",
    },
    {
        "value": CollateralType.SALARY_DEDUCTION.value,
        "label_fa": "کسر از حقوق",
        "label_en": "Salary deduction",
    },
    {
        "value": CollateralType.INVESTMENT_FUND.value,
        "label_fa": "صندوق سرمایه‌گذاری",
        "label_en": "Investment fund units",
    },
    {
        "value": CollateralType.GOLD.value,
        "label_fa": "طلا",
        "label_en": "Gold",
    },
    {
        "value": CollateralType.SILVER.value,
        "label_fa": "نقره",
        "label_en": "Silver",
    },
    {
        "value": CollateralType.CRYPTO.value,
        "label_fa": "رمزارز",
        "label_en": "Cryptocurrency",
    },
]
