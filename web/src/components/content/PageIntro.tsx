import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

/** Title band for listing routes (blog, customers, changelog) that have no Hero block. */
export function PageIntro({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string | null; children?: ReactNode }) {
  return (
    <section className="bg-gradient-to-b from-surface-accent to-bg pt-16 pb-12 text-center sm:pt-24">
      <Container>
        {eyebrow && <p className="text-sm font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>}
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
