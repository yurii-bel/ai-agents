"use client";

import {
  ArrowRight,
  Microscope,
  CirclePlus,
  Gift,
  LoaderCircle,
} from "lucide-react";

export default function ResearchAgentCard() {
  return (
    <div className="opacity-50 h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 ">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 ">
        <div className="flex gap-2">
          <Microscope className="w-5 h-5 text-purple-400" />
          <CirclePlus className="w-5 h-5 text-blue-400" />
          <Gift className="w-5 h-5 text-pink-400" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-3 group-hover:bg-gradient-to-r ">
        Research → Summarize → Present
      </h2>

      <p className="text-slate-300 mb-6 text-lg leading-relaxed">
        Here, three specialized sub-agents collaborate to produce clean, factual
        summaries.
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-700">
        <div className="flex gap-2">
          <LoaderCircle className="w-5 h-5 text-slate-500 animate-spin" />
          <span className="text-sm text-slate-500">In Progress</span>
        </div>

        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  );
}
