"use client";

import { useState } from "react";
import SceneSearch from "@/components/scene/scene-search";
import SceneDisplay from "@/components/scene/scene-display";
import fetchScene from "@/api/fetch-scene";
import Link from "next/link";
import { Home, ArrowBigLeft } from "lucide-react";

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
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="relative z-10">
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <ArrowBigLeft className="w-4 h-4" />
            Back to Hub
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
