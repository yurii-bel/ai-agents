import Background from "@/components/home/layout/background";
import Header from "@/components/home/header";
import SceneAgentCard from "@/components/home/cards/scene-agent-card";
import ComingSoonCard from "@/components/home/cards/coming-soon-card";
import Footer from "@/components/home/footer";
import ResearchAgentCard from "@/components/home/cards/research-agent-card";
import Card from "@/components/home/cards/card";
import CardsList from "@/components/home/cards/cards-list";
import { cardsData } from "@/data/cards-data";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[74rem]">
          <Header />
          <CardsList cards={cardsData} />
          <Footer />
        </div>
      </main>
    </div>
  );
}
