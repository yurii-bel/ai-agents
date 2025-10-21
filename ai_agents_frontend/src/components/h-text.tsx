import { HighlightText } from "./ui/shadcn-io/highlight-text";

type TextPorps = {
  text: string;
};

export default function HText({ text }: TextPorps) {
  return (
    <HighlightText
      className="px-4"
      text={text}
      inView={true}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );
}
