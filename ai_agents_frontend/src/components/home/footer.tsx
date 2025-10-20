export default function Footer() {
  const currentYear = new Date().getFullYear();

  const techStack = ["Next.js", "Shadcn UI", "Python", "Pydantic AI"];

  return (
    <footer className="mt-24 border-t border-slate-800 bg-gradient-to-b from-transparent to-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
            {techStack.map((tech, index) => (
              <div key={tech} className="flex items-center">
                <span className="px-3 py-1 rounded-sm bg-slate-800/50 border border-slate-700/50">
                  {tech}
                </span>
                {index < techStack.length - 1 && (
                  <span className="mx-2 text-slate-600">•</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-sm text-slate-500">
            Made by{" "}
            <span className="text-slate-300 font-semibold">
              Yurii Beliavtsev
            </span>
          </div>

          <div className="text-sm text-slate-500">
            © {currentYear} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
