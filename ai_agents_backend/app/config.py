from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Loads and validates application settings from environment variables."""
    
    openweather_api_key: str
    freesound_api_key: str
    pexels_api_key: str
    google_api_key: str
    loudly_api_key: str 

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8",extra="ignore")

# Creates a single instance to be used across the application
settings = Settings()