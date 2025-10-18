"use client";

import Link from "next/link";
import { Cloud, Image, Music, ArrowRight } from "lucide-react";

export default function SceneAgentCard() {
  return (
    <Link href="/scene-agent" passHref className="group">
      <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-purple-500/30">
          <div className="flex gap-2">
            <Cloud className="w-5 h-5 text-purple-400" />
            <Music className="w-5 h-5 text-blue-400" />
            <Image className="w-5 h-5 text-pink-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          Weather → Sound → Image
        </h2>

        <p className="text-slate-300 mb-6 text-lg leading-relaxed">
          Get real-time weather information & interactive scene for any location
          around the world. Experience nature through multiple senses.
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <span className="text-sm text-slate-400">
            Powered by AI • Instant results
          </span>
          <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
