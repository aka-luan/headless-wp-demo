import type { RichTextBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section } from "@/components/ui/Container";
import { RichText } from "@/components/ui/RichText";

export function RichTextBlock({ block }: { block: RichTextBlockFragment }) {
  return (
    <Section>
      <div className="grid lg:grid-cols-12">
        <RichText html={block.content} className="text-lg lg:col-span-7 lg:col-start-5" />
      </div>
    </Section>
  );
}
