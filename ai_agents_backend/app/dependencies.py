from typing import AsyncGenerator
from httpx import AsyncClient

# A single, reusable HTTP client for the entire application lifespan
_http_client: AsyncClient | None = None

async def get_http_client() -> AsyncGenerator[AsyncClient, None]:
    """Dependency to provide a shared httpx.AsyncClient."""
    global _http_client
    if _http_client is None:
        _http_client = AsyncClient()
    yield _http_client

async def close_http_client():
    """Event handler to properly close the client on shutdown."""
    global _http_client
    if _http_client:
        await _http_client.aclose()
        _http_client = None