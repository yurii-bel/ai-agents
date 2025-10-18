# app/services/weather_service.py
from httpx import AsyncClient, HTTPStatusError
from fastapi import HTTPException
from app.schemas import WeatherResult

async def fetch_weather(city: str, client: AsyncClient, api_key: str) -> WeatherResult:
    """Fetches weather data from the OpenWeatherMap API."""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": api_key, "units": "metric"}
    
    try:
        r = await client.get(url, params=params)
        r.raise_for_status()
        data = r.json()
        print(data)
        
        return WeatherResult(
            city=data["name"],
            temperature=data["main"]["temp"],
            description=data["weather"][0]["description"].capitalize(),
        )
    except HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Error fetching weather: {e.response.text}")