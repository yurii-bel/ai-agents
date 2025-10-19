from pydantic import BaseModel, HttpUrl
from typing import List, Optional


# API Result Models
class WeatherResult(BaseModel):
    temperature: float
    description: str
    city: str

class SoundResult(BaseModel):
    id: int
    name: str
    preview_url: Optional[str] = None
    duration: Optional[float] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    
class MusicResult(BaseModel):
    id: str
    title: str
    duration: Optional[int] = None  # in milliseconds
    music_url: str
    waveform_url: Optional[str] = None
    created_at: Optional[str] = None
    bpm: Optional[int] = None
    key: Optional[str] = None

class ImageResult(BaseModel):
    id: int
    url: HttpUrl
    photographer: str
    alt: str

# Request Body Models
class QueryRequest(BaseModel):
    query: str


# Scene Response Model
class SceneResponse(BaseModel):
    weather: WeatherResult
    # sound: Optional[SoundResult] = None
    music: Optional[MusicResult] = None
    image: Optional[ImageResult] = None