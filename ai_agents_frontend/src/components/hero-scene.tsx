import { SparklesCore } from "./ui/shadcn-io/sparkles";

export default function HeroScene() {
  return (
    <div className="relative h-64 w-full bg-slate-950 overflow-hidden">
      <div className="relative z-10 flex flex-col gap-6 items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Scene Generator</h1>
        <p className="text-xl text-center w-full text-slate-300  mx-auto leading-relaxed">
          Enter a location to generate an immersive atmospheric experience.
        </p>
      </div>

      <SparklesCore
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0 w-full h-full"
        particleColor="#FFFFFF"
        speed={1}
      />
    </div>
  );
}
