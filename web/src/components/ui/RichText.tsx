/**
 * HTML from WordPress WYSIWYG fields. Only trusted editors can write it, and
 * WordPress already filters unsafe markup for users without unfiltered_html.
 */
export function RichText({ html, className = "" }: { html: string | null | undefined; className?: string }) {
  if (!html) return null;
  return (
    <div
      className={`prose max-w-none prose-tagline prose-a:text-accent prose-a:underline-offset-4 prose-headings:font-display prose-h2:text-[2.25rem] prose-h2:leading-none prose-h3:font-label prose-strong:text-fg ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
