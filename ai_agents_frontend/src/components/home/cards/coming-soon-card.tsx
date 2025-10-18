export default function ComingSoonCard() {
  return (
    <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 opacity-60">
      <div className="w-20 h-20 bg-slate-700/30 rounded-full flex items-center justify-center mb-6 border border-slate-600/30">
        <div className="text-3xl">✨</div>
      </div>

      <h2 className="text-3xl font-bold text-slate-400 mb-3">
        More Agents Coming Soon
      </h2>
      <p className="text-slate-400 mb-6 text-lg leading-relaxed">
        We&apos;re building more powerful agents to enhance your creative
        workflow. Stay tuned for exciting new features.
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-slate-700/30">
        <span className="text-sm text-slate-500">Coming Soon</span>
      </div>
    </div>
  );
}
