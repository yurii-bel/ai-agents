from httpx import AsyncClient, HTTPStatusError
from fastapi import HTTPException
from typing import List
from app.schemas import MusicResult, SoundResult


async def search_sounds(query: str, client: AsyncClient, api_key: str) -> List[SoundResult]:
    """
    Searches for high-quality ambient sounds on the Freesound API.
    Focuses on natural, environmental sounds that match weather conditions.
    """
    url = "https://freesound.org/apiv2/search/text/"

    params = {
        "query": query,
        "fields": "id,name,previews,duration,avg_rating,num_ratings,description,tags",
        "filter": " ".join([
            "(tag:field-recording OR tag:nature OR tag:ambience OR tag:atmosphere OR tag:environment)",
            "AND duration:[10.0 TO 180.0]",
            "AND avg_rating:[3.5 TO *]",
        ]),
        "sort": "rating_desc",
        "page_size": 5,
    }

    headers = {"Authorization": f"Token {api_key}"}

    try:
        r = await client.get(url, params=params, headers=headers)
        r.raise_for_status()
        data = r.json()

        results = []
        for s in data.get("results", [])[:5]:
            name_lower = s["name"].lower()
            tags = [t.lower() for t in s.get("tags", [])]
            music_keywords = ["music", "song", "melody", "guitar", "piano", "beat", "track"]

            if any(keyword in name_lower for keyword in music_keywords):
                continue
            if any(keyword in tags for keyword in music_keywords):
                continue

            results.append(
                SoundResult(
                    id=s["id"],
                    name=s["name"],
                    preview_url=s.get("previews", {}).get("preview-hq-mp3"),
                    duration=s.get("duration"),
                    rating=s.get("avg_rating"),
                    description=s.get("description", "")[:200],
                )
            )

        return results

    except HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error searching sounds: {e.response.text}",
        )


async def generate_loudly_music(music_prompt: str, client: AsyncClient, api_key: str) -> dict:
    """
    Calls FastAPI /music endpoint to generate AI music using Loudly API.
    """

    if not music_prompt or not music_prompt.strip():
        raise ValueError("Music prompt cannot be empty")

    try:
        response = await client.post(
            "http://localhost:8000/music", 
            json={"query": music_prompt},
            timeout=60.0,
        )
        response.raise_for_status()
        return response.json()

    except HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error generating music: {e.response.text}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Music generation error: {str(e)}",
        )
