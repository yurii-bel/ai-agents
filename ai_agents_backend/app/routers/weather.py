from fastapi import APIRouter, Depends
from httpx import AsyncClient
from app.config import settings
from app.dependencies import get_http_client
from app.schemas import WeatherResult, QueryRequest
from app.services import weather_service

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.post("", response_model=WeatherResult)
async def get_weather_data(
    body: QueryRequest,
    client: AsyncClient = Depends(get_http_client)
):
    """Endpoint to get weather data for a city."""
    return await weather_service.fetch_weather(
        city=body.query, 
        client=client, 
        api_key=settings.openweather_api_key
    )