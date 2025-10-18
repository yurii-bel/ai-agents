export default async function fetchScene(
  query: string
): Promise<SceneResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error(
      "API URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL."
    );
  }

  const response = await fetch(`${apiBaseUrl}/scene`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create scene");
  }

  return response.json();
}
