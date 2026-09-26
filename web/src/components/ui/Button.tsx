import Link from "next/link";

import type { SiteLink } from "@/lib/wp/links";

const variants = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  secondary: "text-fg ring-[1.5px] ring-fg ring-inset hover:bg-fg hover:text-bg",
  inverse: "bg-inverse-fg text-inverse hover:bg-white",
};

type ButtonLinkProps = {
  link: SiteLink;
  variant?: keyof typeof variants;
  size?: "md" | "lg";
  className?: string;
};

export const buttonBase =
  "font-label inline-flex items-center justify-center rounded-control transition-colors duration-150";

export function ButtonLink({ link, variant = "primary", size = "md", className = "" }: ButtonLinkProps) {
  const classes = `${buttonBase} ${size === "lg" ? "h-13 px-6 text-base" : "h-10 px-4 text-sm"} ${variants[variant]} ${className}`;
  return <SmartLink link={link} className={classes} />;
}

/** next/link for site paths, a plain anchor for external URLs. */
export function SmartLink({ link, className, children }: { link: SiteLink; className?: string; children?: React.ReactNode }) {
  const content = children ?? link.label;
  const newTab = link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  if (link.external) {
    return (
      <a href={link.href} className={className} {...newTab}>
        {content}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} {...newTab}>
      {content}
    </Link>
  );
}
