interface SceneResponse {
  weather: {
    temperature: number;
    description: string;
    city: string;
  };
  sound?: {
    id: number;
    name: string;
    preview_url: string;
  };
  music?: {
    id: string;
    title: string;
    music_url: string;
  };
  image?: {
    id: number;
    url: string;
    photographer: string;
    alt: string;
  };
}
