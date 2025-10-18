from contextlib import asynccontextmanager
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logfire

from app.dependencies import close_http_client
from app.routers import music, weather, sound, image, scene

# --- Lifespan Management ---

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the application's lifespan. Code before 'yield' runs on startup,
    and code after 'yield' runs on shutdown.
    """
    print("Application startup complete.")
    
    yield  # The application runs while the lifespan context is active
    
    print("Closing shared HTTP client...")
    await close_http_client()
    print("Application shutdown complete.")

# --- FastAPI App Initialization ---

logfire.configure(send_to_logfire="if-token-present")

app = FastAPI(
    title="Atmospheric Scene API",
    description="An API to create atmospheric scenes with weather, sounds, and images.",
    version="1.0.0",
    lifespan=lifespan
)

# Dynamic CORS configuration
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Allow both local and production URLs
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    frontend_url,
    "https://ai-agents-ten-azure.vercel.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers and Endpoints ---

app.include_router(weather.router)
app.include_router(sound.router)
app.include_router(image.router)
app.include_router(scene.router)
app.include_router(music.router)

@app.get("/", tags=["Root"])
async def read_root():
    """Root endpoint for health checks."""
    return {"status": "API is running"}