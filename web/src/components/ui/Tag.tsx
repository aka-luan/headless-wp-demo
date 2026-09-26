import type { ReactNode } from "react";

export const tagColors = {
  manila: "bg-tag-manila text-fg",
  mint: "bg-tag-mint text-fg",
  blush: "bg-tag-blush text-fg",
  sky: "bg-tag-sky text-fg",
  ink: "bg-fg text-bg",
} as const;

export type TagColor = keyof typeof tagColors;

/** A paper tag, for content that is a label: a theme, a type, a plan badge. */
export function Tag({
  children,
  color = "manila",
  className = "",
  as: As = "span",
}: {
  children: ReactNode;
  color?: TagColor;
  className?: string;
  as?: "span" | "p" | "li";
}) {
  return <As className={`tag font-label h-7 text-[0.8125rem] ${tagColors[color]} ${className}`}>{children}</As>;
}
