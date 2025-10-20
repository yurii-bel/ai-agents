import { Boxes } from "@/components/ui/shadcn-io/background-boxes";
import { cn } from "@/lib/utils";
import { HeroGeometric } from "./ui/shadcn-io/shape-landing-hero";

export default function LadningHero() {
  return (
    <div className="h-112 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <HeroGeometric
        badge="AI Agents Hub"
        title1="Elevate Your"
        title2="Digital Vision"
        description="Choose an agent to generate immersive experiences powered by AI"
      />
      {/* <h1
        className={cn(
          "relative z-20 text-6xl md:text-7xl pb-4 font-bold text-slate-200 mb-6"
        )}
      >
        AI Agents Hub
      </h1>
      <p className="text-xl text-center mt-2 text-neutral-300 relative z-20">
        Choose an agent to generate immersive experiences powered by AI
      </p> */}
    </div>
  );
}
