/**
 * HTML from WordPress WYSIWYG fields. Only trusted editors can write it, and
 * WordPress already filters unsafe markup for users without unfiltered_html.
 */
export function RichText({ html, className = "" }: { html: string | null | undefined; className?: string }) {
  if (!html) return null;
  return (
    <div
      className={`prose prose-slate max-w-none prose-a:text-accent prose-headings:tracking-tight ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
