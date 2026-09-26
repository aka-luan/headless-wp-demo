import type { CtaBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Cta({ block }: { block: CtaBlockFragment }) {
  const cta = toLink(block.cta);

  return (
    <section className="bg-accent py-20 text-accent-fg sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-display-lg lg:col-span-8">{block.heading}</h2>
          <div className="lg:col-span-4 lg:pb-2">
            {block.text && <p className="text-xl text-pretty text-white/85">{block.text}</p>}
            {cta && <ButtonLink link={cta} size="lg" variant="inverse" className="mt-8" />}
          </div>
        </div>
      </Container>
    </section>
  );
}
