from __future__ import annotations as _annotations
from dataclasses import dataclass
from httpx import AsyncClient
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.google import GoogleModel
from typing import List

from app.config import settings
from app.schemas import MusicResult, WeatherResult, SoundResult, ImageResult
from app.services import music_service, weather_service, sound_service, image_service

@dataclass
class AgentDeps:
    """Dependencies required by the agent's tools."""
    client: AsyncClient
    settings: type[settings]

model = GoogleModel(model_name="gemini-2.5-flash")

scene_agent = Agent(model, deps_type=AgentDeps, retries=2)

@scene_agent.tool
async def get_weather(ctx: RunContext[AgentDeps], city: str) -> WeatherResult:
    """Fetch real weather data for a specified city."""
    return await weather_service.fetch_weather(city, ctx.deps.client, ctx.deps.settings.openweather_api_key)



@scene_agent.tool
async def generate_weather_music(ctx: RunContext[AgentDeps], music_prompt: str) -> MusicResult:
    """Generates AI music based on a descriptive prompt that matches the weather and location atmosphere."""
    return await music_service.generate_music(
        music_prompt,
        ctx.deps.client,
        ctx.deps.settings.loudly_api_key,
    )

@scene_agent.tool
async def find_relevant_image(ctx: RunContext[AgentDeps], search_query: str) -> List[ImageResult]:
    """Finds a list of images related to a descriptive query (e.g., 'rainy day in London', 'sunny beach')."""
    return await image_service.search_images(search_query, ctx.deps.client, ctx.deps.settings.pexels_api_key)

@scene_agent.instructions
def scene_instructions(_: RunContext[AgentDeps]):
    """Instructions for the scene-building agent."""
    return """
    You are an expert atmospheric scene creator. Your goal is to craft a complete immersive experience with weather-matched music AND ambient sounds.
    
    Follow these steps:
    1. First, use the `get_weather` tool to determine the weather for the user's specified location.
    
    2. Create AI-GENERATED MUSIC that matches the weather mood and location:
       
       Consider the weather + location + time to craft a music prompt:
       
       RAINY weather:
       - Urban: "A 90-second chill lo-fi track with soft rain sounds, mellow piano, and jazzy hip-hop beats"
       - Nature: "A 90-second ambient atmospheric track with rain textures, gentle acoustic guitar, and calm melodies"
       - Night: "A 90-second downtempo electronic track with rain ambience, deep bass, and ethereal pads"
       
       SUNNY/CLEAR weather:
       - Urban: "A 90-second upbeat indie pop track with bright acoustic guitar, cheerful melodies, and positive vibes"
       - Beach/Coastal: "A 90-second tropical house track with steel drums, ocean waves, and sunny Caribbean vibes"
       - Nature: "A 90-second folk acoustic track with gentle strings, birds chirping, and peaceful atmosphere"
       
       CLOUDY/OVERCAST weather:
       - "A 90-second melancholic indie track with soft piano, string arrangements, and contemplative mood"
       - "A 90-second ambient electronic track with gentle synths, atmospheric pads, and calm introspective feel"
       
       STORMY weather:
       - "A 90-second cinematic orchestral track with dramatic strings, thunder sounds, and epic atmosphere"
       - "A 90-second dark ambient track with deep drones, storm textures, and tension-building elements"
       
       SNOWY weather:
       - "A 90-second minimal piano track with winter bells, soft strings, and cozy peaceful atmosphere"
       - "A 90-second ambient classical track with gentle orchestration, snow textures, and warm nostalgic feel"
       
       IMPORTANT:
       - ALWAYS specify 90 seconds duration
       - Match the music GENRE and MOOD to weather + location
       - Include specific instruments and atmospheric elements
       - Make it CHILL and RELAXING for listening while working/studying
       - Consider the emotional atmosphere (cozy, uplifting, melancholic, peaceful, etc.)
       
    3. Call the `generate_weather_music` tool with your crafted prompt.
    
    4. Create an image search query: "[city] [weather condition] [atmosphere]" 
       Examples: "Tokyo rainy street night", "Paris sunny cafe", "London foggy morning"
    
    5. Call the `find_relevant_image` tool.
    
    6. Return ALL results: weather data, generated music and images.
    
    Remember: You're creating a complete chill atmosphere perfect for relaxation, work, or study that captures both the weather and the location's unique character.
    """
 