export default function Footer() {
  const currentYear = new Date().getFullYear();

  const techStack = ["Next.js", "Shadcn UI", "Python", "Pydantic AI"];

  return (
    <footer className="mt-12 sm:mt-16 md:mt-24 border-t border-slate-800 bg-gradient-to-b from-transparent to-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-400">
            {techStack.map((tech, index) => (
              <div key={tech} className="flex items-center">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm bg-slate-800/50 border border-slate-700/50 whitespace-nowrap">
                  {tech}
                </span>
                {index < techStack.length - 1 && (
                  <span className="mx-1 sm:mx-2 text-slate-600">•</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-slate-500 text-center">
            Made by{" "}
            <span className="text-slate-300 font-semibold">
              Yurii Beliavtsev
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-500">
            © {currentYear} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
