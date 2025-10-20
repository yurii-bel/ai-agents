import {
  Cloud,
  Music,
  ImageUp,
  MousePointerClick,
  Microscope,
  CirclePlus,
  Gift,
} from "lucide-react";

export const cardsData = [
  {
    id: "scene-agent",
    title: "Weather → Sound → Image",
    description:
      "Get real-time weather information & interactive scene for any location around the world. Experience nature through multiple senses.",
    icons: [
      { icon: Cloud, className: "w-5 h-5 text-purple-400" },
      { icon: Music, className: "w-5 h-5 text-blue-400" },
      { icon: ImageUp, className: "w-5 h-5 text-pink-400" },
    ],
    linkHref: "/scene-agent",
    linkText: "Try It Now",
    LinkIcon: MousePointerClick,
  },
  {
    id: "research-agent",
    title: "Research → Summarize → Present",
    description:
      "Get fast, reliable insights as three expert sub-agents collaborate seamlessly to produce clean and accurate summaries.",
    icons: [
      { icon: Microscope, className: "w-5 h-5 text-yellow-400" },
      { icon: CirclePlus, className: "w-5 h-5 text-orange-400" },
      { icon: Gift, className: "w-5 h-5 text-red-400" },
    ],
    linkHref: "/research-agent",
    linkText: "Start Creating",
    LinkIcon: MousePointerClick,
    status: "in-progress",
  },
];
