import { toLink } from "@/lib/wp/links";
import type { Layout } from "@/lib/wp/layout";
import { SmartLink } from "@/components/ui/Button";

export function AnnouncementBar({ announcement }: { announcement: Layout["settings"]["announcement"] }) {
  if (!announcement) return null;
  const link = toLink(announcement.link);

  return (
    <div className="bg-inverse px-4 py-2 text-center text-sm text-inverse-fg">
      <span>{announcement.text}</span>
      {link && (
        <>
          {" "}
          <SmartLink
            link={link}
            className="font-label whitespace-nowrap text-tag-manila underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {link.label}
          </SmartLink>
        </>
      )}
    </div>
  );
}
