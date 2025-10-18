from fastapi import APIRouter, Depends
from httpx import AsyncClient
from app.config import settings
from app.dependencies import get_http_client
from app.schemas import MusicResult, QueryRequest
from app.services import music_service

router = APIRouter(prefix="/music", tags=["Music"])

@router.post("", response_model=MusicResult)
async def generate_music(
    body: QueryRequest,
    client: AsyncClient = Depends(get_http_client)
):
    """Endpoint to generate AI music based on a text prompt."""
    return await music_service.generate_music(
        prompt=body.query, 
        client=client, 
        api_key=settings.loudly_api_key
    )