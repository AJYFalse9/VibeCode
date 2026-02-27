import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import products, auth

app = FastAPI(title="Vibecoding Workshop API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins to prevent 127.0.0.1 vs localhost mismatches
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(products.router)

@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Backend is running smoothly!"}

# Serve static files in production
# In Docker, the Next.js static files are copied to /app/static
STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "static")
FRONTEND_OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "out")

if os.path.exists(STATIC_DIR):
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
elif os.path.exists(FRONTEND_OUT_DIR):
    app.mount("/", StaticFiles(directory=FRONTEND_OUT_DIR, html=True), name="local_static")
