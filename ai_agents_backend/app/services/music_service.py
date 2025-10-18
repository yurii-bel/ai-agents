from httpx import AsyncClient, HTTPStatusError
from fastapi import HTTPException
from app.schemas import MusicResult

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
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Error generating music: {e.response.text}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Music generation error: {str(e)}",
        )
