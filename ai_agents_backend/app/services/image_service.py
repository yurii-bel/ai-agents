# app/services/image_service.py
from httpx import AsyncClient, HTTPStatusError
from fastapi import HTTPException
from typing import List
from app.schemas import ImageResult

async def search_images(query: str, client: AsyncClient, api_key: str) -> List[ImageResult]:
    """Searches for images on the Pexels API."""
    url = "https://api.pexels.com/v1/search"
    params = {"query": query, "per_page": 5}
    headers = {"Authorization": api_key}
    
    try:
        r = await client.get(url, params=params, headers=headers)
        r.raise_for_status()
        data = r.json()
        
        return [
            ImageResult(
                id=p["id"],
                url=p["src"]["large"],
                photographer=p["photographer"],
                alt=p.get("alt", query),
            )
            for p in data.get("photos", [])
        ]
    except HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Error searching images: {e.response.text}")