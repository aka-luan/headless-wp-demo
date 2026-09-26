import type { CtaBlockFragment } from "@/lib/wp/__generated__/graphql";
import { toLink } from "@/lib/wp/links";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Cta({ block }: { block: CtaBlockFragment }) {
  const cta = toLink(block.cta);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="rounded-card bg-inverse px-6 py-14 text-center text-inverse-fg sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {block.heading}
          </h2>
          {block.text && <p className="mx-auto mt-4 max-w-xl text-lg text-inverse-muted">{block.text}</p>}
          {cta && <ButtonLink link={cta} size="lg" variant="inverse" className="mt-8" />}
        </div>
      </Container>
    </section>
  );
}
