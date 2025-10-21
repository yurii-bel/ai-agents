import { Cloud, Loader2, Search, MapPin } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import HText from "../h-text";

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-4xl mb-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center gap-3">
            <Cloud className="w-16 h-16 text-slate-400" />
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
              <HText text="Scene Generator" />
            </h1>
          </div>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Enter a location to generate an immersive atmospheric experience
            with realistic weather and ambiance
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="relative">
            <div className="bg-slate-900 rounded-2xl p-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    type="text"
                    placeholder="Enter a city or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-slate-800/50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/50 text-white placeholder:text-slate-500 text-lg py-7 pl-12 pr-6 rounded-xl"
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 text-white font-semibold px-8 py-7 rounded-xl transition-all duration-200 flex items-center gap-2 hover:cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="hidden sm:inline">Generating...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span className="hidden sm:inline">Generate Scene</span>
                      <span className="sm:hidden">Go</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-950/50 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
              Popular Destinations
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["New York", "Paris", "Rome", "Kyiv"].map((city) => (
              <button
                key={city}
                onClick={() => handleFeaturedClick(city)}
                disabled={loading}
                className="group relative px-5 py-4 rounded-xl bg-slate-800/50 hover:scale-105 active:scale-95 border border-slate-700/50 hover:border-slate-600 hover:cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="text-slate-300 group-hover:text-white font-medium transition-colors">
                  {city}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm">
          Try cities, landmarks, or any location worldwide
        </p>
      </div>
    </div>
  );
};

export default SceneSearch;
