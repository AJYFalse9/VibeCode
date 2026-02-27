from fastapi import APIRouter
from typing import List
from models import Product

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)

# Mock Database
MOCK_PRODUCTS = [
    {"id": 1, "name": "Mechanical Keyboard", "price": 120.0, "stock": 45},
    {"id": 2, "name": "Ergonomic Mouse", "price": 60.0, "stock": 100},
    {"id": 3, "name": "Ultrawide Monitor", "price": 450.0, "stock": 12},
]

@router.get("", response_model=List[Product])
def get_products():
    """Retrieve mockup data for products stock"""
    return MOCK_PRODUCTS
