from fastapi import APIRouter, Depends
from httpx import AsyncClient
from typing import List
from app.config import settings
from app.dependencies import get_http_client
from app.schemas import ImageResult, QueryRequest
from app.services import image_service

router = APIRouter(prefix="/image", tags=["Image"])

@router.post("", response_model=List[ImageResult])
async def search_for_images(
    body: QueryRequest,
    client: AsyncClient = Depends(get_http_client)
):
    """Endpoint to search for images."""
    return await image_service.search_images(
        query=body.query, 
        client=client, 
        api_key=settings.pexels_api_key
    )