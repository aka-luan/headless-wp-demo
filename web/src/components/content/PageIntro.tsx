import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

/** Title band for listing routes (blog, customers, changelog) that have no Hero block. */
export function PageIntro({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string | null; children?: ReactNode }) {
  return (
    <section className="pt-14 pb-12 sm:pt-20 sm:pb-16">
      <Container>
        {eyebrow && <Tag as="p">{eyebrow}</Tag>}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="font-display text-display-lg lg:col-span-8">{title}</h1>
          {intro && <p className="max-w-md text-xl text-pretty text-muted lg:col-span-4 lg:pb-2">{intro}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}
