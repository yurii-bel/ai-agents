"use client";

import { useState } from "react";
import SceneSearch from "@/components/scene/scene-search";
import SceneDisplay from "@/components/scene/scene-display";
import fetchScene from "@/api/fetch-scene";
import Link from "next/link";
import { Home } from "lucide-react";

export default function SceneMain() {
  const [scene, setScene] = useState<SceneResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setScene(null);

    try {
      const data = await fetchScene(query);
      setScene(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setScene(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        {!scene ? (
          <SceneSearch
            onSearch={handleSearch}
            loading={loading}
            error={error}
          />
        ) : (
          <SceneDisplay scene={scene} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
