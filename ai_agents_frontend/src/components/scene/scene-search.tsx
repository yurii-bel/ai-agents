import { Cloud, Loader2, Search } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SceneSearch = ({
  onSearch,
  loading,
  error,
}: {
  onSearch: (query: string) => void;
  loading: boolean;
  error: string | null;
}) => {
  const [query, setQuery] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  const handleFeaturedClick = (city: string) => {
    setQuery(city);
    onSearch(city);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Scene Generator
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">
            Enter a location to generate an immersive atmospheric experience.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-75"></div>
            <div className="relative bg-slate-900 rounded-xl p-1">
              <div className="flex items-center gap-2 px-1">
                <Input
                  type="text"
                  placeholder="Try: New York, Paris, Rome, Kyiv..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-slate-800 border-0 text-white placeholder:text-slate-400 focus:ring-0 text-lg py-6 px-6 flex-1"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:cursor-pointer hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-lg transition-all duration-200 flex items-center gap-2 m-1"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {loading ? "Generating..." : "Generate"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="mt-12">
          <p className="text-slate-400 text-sm mb-4 text-center">
            Featured locations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["New York", "Paris", "Rome", "Kyiv"].map((city) => (
              <button
                key={city}
                onClick={() => handleFeaturedClick(city)}
                className="px-4 py-3 rounded-lg bg-slate-800/50 hover:cursor-pointer hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneSearch;
