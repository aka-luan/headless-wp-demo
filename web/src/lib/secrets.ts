import "server-only";

import { timingSafeEqual } from "node:crypto";

/** Constant-time comparison against a secret from the environment. False when the secret is unset. */
export function matchesSecret(given: string | null, envName: "REVALIDATE_SECRET" | "PREVIEW_SECRET"): boolean {
  const expected = process.env[envName];
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
