import type { NextRequest } from "next/server";

import { contactSchema, createLead, isRateLimited, sendContactEmail } from "@/lib/contact";

/** Caddy is the only way in and sets X-Forwarded-For, so its first entry is the client. */
function clientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid form data." }, { status: 400 });
  }

  // Bots that fill the hidden field get a normal-looking success and nothing is sent.
  if (parsed.data.website) return Response.json({ ok: true });

  if (isRateLimited(clientIp(request))) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const [email, lead] = await Promise.allSettled([sendContactEmail(parsed.data), createLead(parsed.data)]);
  if (email.status === "rejected") console.error("[contact] email failed:", email.reason);
  if (lead.status === "rejected") console.error("[contact] lead failed:", lead.reason);

  // One channel is enough not to lose the enquiry; asking the visitor to retry would duplicate it.
  if (email.status === "rejected" && lead.status === "rejected") {
    return Response.json({ error: "We couldn't send your message. Please try again later." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
