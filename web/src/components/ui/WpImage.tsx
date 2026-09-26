import Image from "next/image";

import type { MediaFragment } from "@/lib/wp/__generated__/graphql";

type WpImageProps = {
  media: MediaFragment | null | undefined;
  /** Required: how wide the image renders at each breakpoint. */
  sizes: string;
  /** Only for the LCP image (the hero). */
  preload?: boolean;
  className?: string;
  alt?: string;
};

/** next/image for WordPress media, using the intrinsic size WordPress reports. */
export function WpImage({ media, sizes, preload = false, className, alt }: WpImageProps) {
  const width = media?.mediaDetails?.width;
  const height = media?.mediaDetails?.height;
  if (!media?.sourceUrl || !width || !height) return null;

  return (
    <Image
      src={media.sourceUrl}
      alt={alt ?? media.altText ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      preload={preload}
      className={className}
    />
  );
}
