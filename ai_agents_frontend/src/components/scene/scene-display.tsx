import {
  ArrowLeft,
  Cloud,
  Headphones,
  MapPin,
  Thermometer,
} from "lucide-react";
import { Button } from "../ui/button";

const SceneDisplay = ({
  scene,
  onReset,
}: {
  scene: SceneResponse;
  onReset: () => void;
}) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 animate-in fade-in duration-500">
    <div className="w-full max-w-4xl">
      {scene.image && (
        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl group">
          <img
            src={scene.image.url}
            alt={scene.image.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-400" />
                <h2 className="text-4xl md:text-5xl font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  {scene.weather.city}
                </h2>
              </div>
              <p className="text-xl text-blue-200 flex items-center gap-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                <Cloud className="w-5 h-5" />
                {scene.weather.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="w-6 h-6 text-orange-400" />
            <h3 className="text-lg font-semibold text-slate-300">
              Temperature
            </h3>
          </div>
          <p className="text-5xl font-bold text-orange-400">
            {Math.round(scene.weather.temperature)}
            <span className="text-3xl ml-1">°C</span>
          </p>
        </div>

        {scene.music?.music_url && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-purple-500/50 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-slate-300">
                Ambient Sound
              </h3>
            </div>
            <p
              className="text-2xl font-semibold text-purple-300 mb-6 truncate"
              title={scene.music.title}
            >
              {scene.music.title}
            </p>
            <audio
              controls
              className="w-full h-10 rounded-lg"
              src={scene.music.music_url}
            />
          </div>
        )}
      </div>

      {scene.image?.photographer && (
        <div className="text-center text-sm text-slate-400 mb-8">
          Photo by{" "}
          <span className="text-slate-300 font-medium">
            {scene.image.photographer}
          </span>{" "}
          on Pexels
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <Button
          onClick={onReset}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Search Again
        </Button>
      </div>
    </div>
  </div>
);

export default SceneDisplay;
