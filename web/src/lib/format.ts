const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

/** "September 2, 2026". WordPress dates are site-timezone (UTC) strings. */
export function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(/[zZ]|[+-]\d\d:?\d\d$/.test(value) ? value : `${value}Z`);
  return Number.isNaN(date.getTime()) ? null : dateFormat.format(date);
}

/** Plain text from a WordPress excerpt (which arrives as HTML). */
export function stripHtml(html: string | null | undefined): string {
  return (html ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
