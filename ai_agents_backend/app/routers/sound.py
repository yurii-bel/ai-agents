from fastapi import APIRouter, Depends
from httpx import AsyncClient
from typing import List
from app.config import settings
from app.dependencies import get_http_client
from app.schemas import SoundResult, QueryRequest
from app.services import sound_service

router = APIRouter(prefix="/sound", tags=["Sound"])

@router.post("", response_model=List[SoundResult])
async def search_for_sounds(
    body: QueryRequest,
    client: AsyncClient = Depends(get_http_client)
):
    """Endpoint to search for sounds."""
    return await sound_service.search_sounds(
        query=body.query, 
        client=client, 
        api_key=settings.freesound_api_key
    )