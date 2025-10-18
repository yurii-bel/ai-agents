from fastapi import APIRouter, Depends, HTTPException
from httpx import AsyncClient
from app.agents import scene_agent, AgentDeps
from app.config import settings
from app.dependencies import get_http_client
from app.schemas import SceneResponse, QueryRequest

router = APIRouter(prefix="/scene", tags=["Scene"])

@router.post("", response_model=SceneResponse)
async def create_scene(
    body: QueryRequest,
    client: AsyncClient = Depends(get_http_client)
):
    """
    Creates a full atmospheric scene by fetching weather,
    an appropriate sound, and a matching image.
    """
    deps = AgentDeps(client=client, settings=settings)
    try:
        # The agent will internally call the tools to fetch weather, sound, and image
        result = await scene_agent.run(
            f"Create a scene for {body.query}", 
            deps=deps, 
            output_type=SceneResponse
        )
        return result.output
    except Exception as e:

        raise HTTPException(status_code=500, detail=f"Failed to create scene: {e}")

