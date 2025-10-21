import { TextRevealButton } from "@/components/ui/shadcn-io/text-reveal-button";

interface TextRevealProps {
  text: string;
}

export default function ButtonReveal({ text }: TextRevealProps) {
  return (
    <div className="w-full h-38 p-6 flex justify-center">
      <TextRevealButton text={text} />
    </div>
  );
}
