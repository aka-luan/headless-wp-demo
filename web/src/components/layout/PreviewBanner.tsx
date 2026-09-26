import { isPreview } from "@/lib/wp/preview";

/** Shown on every page while an editor is in Draft Mode. */
export async function PreviewBanner() {
  if (!(await isPreview())) return null;

  return (
    <div role="status" className="sticky top-0 z-50 bg-tag-manila text-fg">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2 text-sm">
        <p>
          <strong className="font-semibold">Preview mode.</strong> You are seeing unpublished changes from WordPress.
        </p>
        <form action="/api/exit-preview/" method="post">
          <button type="submit" className="font-semibold underline underline-offset-2 hover:no-underline">
            Exit preview
          </button>
        </form>
      </div>
    </div>
  );
}
