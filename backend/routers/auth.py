from fastapi import APIRouter

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

@router.post("/login")
def login():
    """Placeholder for JWT Authentication login."""
    return {"message": "JWT Auth not implemented yet. Use this router to build it!"}

@router.post("/register")
def register():
    """Placeholder for Registration."""
    return {"message": "Register endpoint."}
