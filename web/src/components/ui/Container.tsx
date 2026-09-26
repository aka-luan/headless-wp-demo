import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
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
    <section className={`py-16 sm:py-24 ${tones[tone]} ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  heading,
  intro,
  align = "center",
}: {
  id?: string;
  heading?: string | null;
  intro?: string | null;
  align?: "center" | "left";
}) {
  if (!heading && !intro) return null;
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {heading && (
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {heading}
        </h2>
      )}
      {intro && <p className="mt-4 text-lg text-pretty text-muted">{intro}</p>}
    </div>
  );
}
