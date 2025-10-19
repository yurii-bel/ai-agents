import random
from httpx import AsyncClient, HTTPStatusError
from fastapi import HTTPException
from app.schemas import MusicResult

import os

def get_frontend_url():
    """Get frontend URL from environment or use default"""
    return os.getenv("FRONTEND_URL", "http://localhost:3000")

FALLBACK_MUSIC = {
    "rainy": [
        {
            "id": "fallback-rain-1",
            "title": "Rainy Day Ambience",
            "music_url": f"{get_frontend_url()}/music/fallback-rain-1.mp3",
        }
    ],
    "sunny": [
        {
            "id": "fallback-sunny-1",
            "title": "Upbeat Sunny Day",
            "music_url": f"{get_frontend_url()}/music/fallback-sunny-1.mp3",
        }
    ],
    "cloudy": [
        {
            "id": "fallback-cloudy-1",
            "title": "Calm Contemplation",
            "music_url": f"{get_frontend_url()}/music/fallback-cloudy-1.mp3",
        }
    ],
    "stormy": [
        {
            "id": "fallback-storm-1",
            "title": "Epic Storm",
            "music_url": f"{get_frontend_url()}/music/fallback-storm-1.mp3",
        }
    ],
    "snowy": [
        {
            "id": "fallback-snow-1",
            "title": "Winter Peaceful",
            "music_url": f"{get_frontend_url()}/music/fallback-snow-1.mp3",
        }
    ],
    "default": [
        {
            "id": "fallback-default-1",
            "title": "Chill Beats",
            "music_url": f"{get_frontend_url()}/music/fallback-default-1.mp3",
        }
    ]
}

def _get_fallback_music(prompt: str) -> MusicResult:
    """
    Returns a fallback music track based on the prompt.
    Uses your hosted music files.
    """
    prompt_lower = prompt.lower()
    
    # Determine weather type from prompt
    if "rain" in prompt_lower or "drizzle" in prompt_lower:
        category = "rainy"
    elif "sun" in prompt_lower or "clear" in prompt_lower or "bright" in prompt_lower:
        category = "sunny"
    elif "cloud" in prompt_lower or "overcast" in prompt_lower:
        category = "cloudy"
    elif "storm" in prompt_lower or "thunder" in prompt_lower:
        category = "stormy"
    elif "snow" in prompt_lower or "winter" in prompt_lower:
        category = "snowy"
    else:
        category = "default"
    
    # Get random track from category
    tracks = FALLBACK_MUSIC.get(category, FALLBACK_MUSIC["default"])
    track = random.choice(tracks)
    
    return MusicResult(
        id=track["id"],
        title=track["title"],
        duration=None,  # Not available for fallback
        music_url=track["music_url"],
        waveform_url=None,
        created_at=None,
        bpm=None,
        key=None
    )


async def generate_music(prompt: str, client: AsyncClient, api_key: str) -> MusicResult:
    """
    Generates AI music using the Loudly API based on a text prompt.
    """
    url = "https://soundtracks.loudly.com/api/ai/prompt/songs"

    headers = {
        "API-KEY": api_key,
        "Accept": "application/json",
    }

    form_data = {
        "prompt": prompt,
        "duration": "",      
        "test": "",          
        "structure_id": "",  
    }

    try:
        r = await client.post(url, data=form_data, headers=headers, timeout=60.0)
        r.raise_for_status()
        data = r.json()

        return MusicResult(
            id=data.get("id"),
            title=data.get("title"),
            duration=data.get("duration"),
            music_url=data.get("music_file_path"),
            waveform_url=data.get("wave_form_file_path"),
            created_at=data.get("created_at"),
            bpm=data.get("bpm"),
            key=data.get("key", {}).get("name") if data.get("key") else None,
        )

    except HTTPStatusError as e:
        # If rate limit exceeded (429) or other API errors, use fallback
        if e.response.status_code == 429:
            print(f"⚠️  Loudly API rate limit exceeded. Using fallback music for prompt: {prompt}")
            return _get_fallback_music(prompt)
        elif e.response.status_code >= 500:
            print(f"⚠️  Loudly API server error. Using fallback music for prompt: {prompt}")
            return _get_fallback_music(prompt)
        else:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Error generating music: {e.response.text}",
            )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Music generation error: {str(e)}",
        )
