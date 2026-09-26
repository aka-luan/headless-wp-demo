import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "inverse";
  "aria-labelledby"?: string;
};

const tones = {
  default: "bg-bg",
  surface: "bg-surface",
  inverse: "bg-inverse text-inverse-fg",
};

/** Vertical rhythm for blocks. */
export function Section({ children, className = "", tone = "default", ...rest }: SectionProps) {
  return (
    <section className={`py-20 sm:py-28 ${tones[tone]} ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

/** Heading on the left, intro beside it on wide screens: the page reads down its left edge. */
export function SectionHeading({ id, heading, intro }: { id?: string; heading?: string | null; intro?: string | null }) {
  if (!heading && !intro) return null;
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      {heading && (
        <h2 id={id} className="font-display text-display-md lg:col-span-7">
          {heading}
        </h2>
      )}
      {intro && <p className="max-w-xl text-lg text-pretty text-muted lg:col-span-5 lg:pb-2">{intro}</p>}
    </div>
  );
}
