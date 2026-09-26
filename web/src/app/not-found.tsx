import Link from "next/link";

import { buttonBase } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <Tag as="p" color="blush">
        Error 404
      </Tag>
      <h1 className="font-display mt-6 text-display-xl">Page not found</h1>
      <p className="mt-6 max-w-md text-xl text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className={`${buttonBase} mt-10 h-13 bg-accent px-6 text-accent-fg hover:bg-accent-hover`}>
        Back to home
      </Link>
    </Container>
  );
}
