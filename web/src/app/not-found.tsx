import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-control bg-accent px-4 py-2.5 text-sm font-medium text-accent-fg hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </Container>
  );
}
