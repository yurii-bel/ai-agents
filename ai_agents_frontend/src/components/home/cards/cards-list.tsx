import Card from "./card";
import { LucideIcon } from "lucide-react";

interface CardData {
  id: string;
  title: string;
  description: string;
  icons: Array<{
    icon: LucideIcon;
    className: string;
  }>;
  linkHref: string;
  linkText: string;
  LinkIcon: LucideIcon;
  status?: string;
}

interface CardsListProps {
  cards: CardData[];
}

export default function CardsList({ cards }: CardsListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-full mx-auto">
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          icons={card.icons}
          linkHref={card.linkHref}
          linkText={card.linkText}
          LinkIcon={card.LinkIcon}
          status={
            card.status as "ready" | "in-progress" | "coming-soon" | undefined
          }
        />
      ))}
    </div>
  );
}
