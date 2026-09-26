import type { RichTextBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export function RichTextBlock({ block }: { block: RichTextBlockFragment }) {
  return (
    <Section>
      <RichText html={block.content} className="mx-auto max-w-3xl text-lg" />
    </Section>
  );
}
