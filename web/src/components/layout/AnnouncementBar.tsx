import { toLink } from "@/lib/wp/links";
import type { Layout } from "@/lib/wp/layout";
import { SmartLink } from "@/components/ui/Button";

export function AnnouncementBar({ announcement }: { announcement: Layout["settings"]["announcement"] }) {
  if (!announcement) return null;
  const link = toLink(announcement.link);

  return (
    <div className="bg-inverse px-4 py-2.5 text-center text-sm text-inverse-fg">
      <span>{announcement.text}</span>
      {link && (
        <>
          {" "}
          <SmartLink link={link} className="font-semibold whitespace-nowrap underline underline-offset-4 hover:no-underline">
            {link.label} <span aria-hidden>→</span>
          </SmartLink>
        </>
      )}
    </div>
  );
}
