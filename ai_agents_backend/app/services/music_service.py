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


async def _get_weather_from_endpoint(client: AsyncClient, city: str) -> str:
    try:
        resp = await client.post(
            os.getenv("BACKEND_WEATHER_URL"),
            json={"city": city},
            timeout=20.0
        )
        resp.raise_for_status()
        data = resp.json()
        
        
        return data.get("description", "default")
    except Exception:
        return "default" 

def _get_fallback_music(prompt: str) -> MusicResult:
    """
    Returns a fallback music track based on the prompt.
    Uses hosted music files.
    """
    
    prompt_lower = prompt.lower()
    
    # Determine weather type from prompt
    if any(word in prompt_lower for word in ["rain", "drizzle", "wet", "shower", "lo-fi", "mellow", "downtempo", "ambient atmospheric"]):
        category = "rainy"
    elif any(word in prompt_lower for word in ["sun", "sunny", "bright", "clear", "warm", "summer", "upbeat", "tropical", "cheerful", "indie pop", "folk acoustic"]):
        category = "sunny"
    elif any(word in prompt_lower for word in ["cloud", "overcast", "gray", "grey", "fog", "mist", "melancholic", "contemplative", "ambient electronic", "soft piano"]):
        category = "cloudy"
    elif any(word in prompt_lower for word in ["storm", "thunder", "lightning", "windy", "hurricane", "dramatic", "epic", "cinematic", "dark ambient", "tension"]):
        category = "stormy"
    elif any(word in prompt_lower for word in ["snow", "winter", "cold", "ice", "blizzard", "frost", "peaceful", "cozy", "minimal", "winter bells", "classical"]):
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
        if e.response.status_code in (429, 500):
            weather_category = await _get_weather_from_endpoint(client, prompt)
            return _get_fallback_music(weather_category)
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
