import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/shadcn-io/3d-card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface CardIcon {
  icon: LucideIcon;
  className: string;
}

interface CardProps {
  title: string;
  description: string;
  icons: CardIcon[];
  linkHref: string;
  linkText: string;
  LinkIcon: LucideIcon;
  status?: "ready" | "in-progress" | "coming-soon";
}

export default function Card({
  title,
  description,
  icons,
  linkHref,
  linkText,
  LinkIcon,
  status = "ready",
}: CardProps) {
  return (
    <CardContainer
      className="inter-var w-full"
      containerClassName="py-4 sm:py-6"
    >
      <CardBody className="bg-gradient-to-b from-slate-900 to-slate-950 w-full h-auto rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-all duration-300 relative">
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5">
          {status !== "ready" ? (
            <>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium text-slate-300">
                In Progress
              </span>
            </>
          ) : (
            <>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400" />
              <span className="text-[10px] sm:text-xs font-medium text-slate-300">
                Ready
              </span>
            </>
          )}
        </div>

        <CardItem translateZ="50" className="mb-4 sm:mb-6">
          <div className="w-20 h-12 sm:w-26 sm:h-16 bg-slate-950/50 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300">
            <div className="flex gap-0.5 sm:gap-1">
              {icons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Icon
                    key={index}
                    className={`${item.className} w-5 h-5 sm:w-6 sm:h-6`}
                  />
                );
              })}
            </div>
          </div>
        </CardItem>

        <CardItem
          translateZ="50"
          className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300 mb-2 sm:mb-3"
        >
          {title}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-slate-300 text-sm sm:text-base leading-relaxed w-full"
        >
          {description}
        </CardItem>

        {status === "ready" ? (
          <div className="flex justify-center items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800">
            <Link href={linkHref} className="flex justify-center w-full">
              <CardItem translateZ={20} as="div" className="w-full">
                <div className="flex justify-center items-center gap-2 pt-3 sm:pt-4 rounded-lg px-4 py-2.5 sm:py-3 bg-slate-800/40 -mx-4 hover:bg-slate-800/70 transition-all duration-200 group/link cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover/link:text-slate-100 transition-colors duration-200">
                    {linkText}
                  </span>
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover/link:text-slate-100 group-hover/link:translate-x-1 transition-all duration-300" />
                </div>
              </CardItem>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800 w-full">
            <div className="flex justify-center w-full">
              <CardItem translateZ={20} as="div" className="w-full">
                <div className="flex justify-center items-center gap-2 pt-3 sm:pt-4 rounded-lg px-4 py-2.5 sm:py-3 bg-slate-800/20 -mx-4 opacity-50">
                  <span className="text-xs sm:text-sm font-bold text-slate-400">
                    {status === "in-progress"
                      ? "Work in Progress"
                      : "Coming Soon"}
                  </span>
                </div>
              </CardItem>
            </div>
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
}
