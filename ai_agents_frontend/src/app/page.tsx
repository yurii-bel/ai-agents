import Background from "@/components/home/layout/background";
import Header from "@/components/home/header";
import SceneAgentCard from "@/components/home/cards/scene-agent-card";
import ComingSoonCard from "@/components/home/cards/coming-soon-card";
import Footer from "@/components/home/footer";
import ResearchAgentCard from "@/components/home/cards/research-agent-card";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Background />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <Header />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <SceneAgentCard />
            <ResearchAgentCard />
            <ComingSoonCard />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
