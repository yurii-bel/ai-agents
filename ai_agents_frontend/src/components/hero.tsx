import { Boxes } from "@/components/ui/shadcn-io/background-boxes";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="h-80 sm:h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      {/* Simple gradient background for mobile */}
      <div className="sm:hidden absolute inset-0 w-full h-full bg-gradient-to-t from-slate-900 via-slate-950 to-slate-900" />

      {/* Animated boxes background for desktop only */}
      <div className="hidden sm:block absolute inset-0">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
      </div>

      <h1
        className={cn(
          "relative z-20 text-4xl sm:text-6xl md:text-7xl pb-3 sm:pb-4 font-bold text-slate-200 mb-4 sm:mb-6 px-4 text-center"
        )}
      >
        AI Agents Hub
      </h1>
      <p className="text-base font-semibold sm:text-xl text-center mt-2 text-neutral-300 relative z-20 px-4">
        Choose an agent to generate immersive experiences powered by AI
      </p>
    </div>
  );
}
