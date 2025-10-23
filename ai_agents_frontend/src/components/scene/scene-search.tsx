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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-4xl mb-8 sm:mb-12 mt-12 sm:mt-0">
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            <Cloud className="w-10 h-10 sm:w-16 sm:h-16 text-slate-400" />
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900">
              <HText text="Scene Generator" />
            </h1>
          </div>

          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Enter a location to generate an immersive atmospheric experience
            with realistic weather and ambiance
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl space-y-6 sm:space-y-8">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="relative">
            <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border border-slate-800">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <Input
                    type="text"
                    placeholder="Enter a city or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-slate-800/50 border-none focus-visible:ring-2 focus-visible:ring-blue-500/50 text-white placeholder:text-slate-500 text-base sm:text-lg py-5 sm:py-7 pl-10 sm:pl-12 pr-4 sm:pr-6 rounded-lg sm:rounded-xl"
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 text-white font-semibold px-6 sm:px-8 py-5 sm:py-7 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:cursor-pointer w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">Generate Scene</span>
                      <span className="xs:hidden">Generate</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-950/50 border border-red-500/30 rounded-xl p-3 sm:p-4">
            <p className="text-red-300 text-center text-sm sm:text-base">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-wide uppercase whitespace-nowrap">
              Popular Destinations
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {["New York", "Paris", "Rome", "Kyiv"].map((city) => (
              <button
                key={city}
                onClick={() => handleFeaturedClick(city)}
                disabled={loading}
                className="group relative px-4 py-3 sm:px-5 sm:py-4 rounded-lg sm:rounded-xl bg-slate-800/50 hover:scale-105 active:scale-95 border border-slate-700/50 hover:border-slate-600 hover:cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="text-sm sm:text-base text-slate-300 group-hover:text-white font-medium transition-colors">
                  {city}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs sm:text-sm px-4">
          Try cities, landmarks, or any location worldwide
        </p>
      </div>
    </div>
  );
};

export default SceneSearch;
