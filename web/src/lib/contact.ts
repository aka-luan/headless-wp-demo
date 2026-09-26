import "server-only";

import nodemailer from "nodemailer";
import { z } from "zod";

import { site } from "@/config/site";
import { wpAuthHeader } from "@/lib/wp/client";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(10, "Please write at least a sentence.").max(5000),
  /** Honeypot: real visitors never see this field. */
  website: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------- rate limit

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * Simple in-memory limit: 5 messages per IP per 10 minutes. Enough for a single Node server;
 * several instances would need a shared store.
 */
export function isRateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear(); // Bound memory under a flood of distinct IPs.
  return false;
}

// ---------------------------------------------------------------- delivery

export async function sendContactEmail(input: ContactInput): Promise<void> {
  const to = process.env.CONTACT_TO;
  if (!process.env.SMTP_HOST || !to) throw new Error("SMTP_HOST and CONTACT_TO must be set");

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    // Mailpit (local) takes no credentials.
    ...(process.env.SMTP_USER ? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } } : {}),
  });

  const fromHost = new URL(site.url).hostname;
  await transport.sendMail({
    from: `"${site.name} website" <no-reply@${fromHost}>`,
    to,
    replyTo: { name: input.name, address: input.email },
    subject: `New enquiry from ${input.name}${input.company ? ` (${input.company})` : ""}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Company: ${input.company || "-"}`,
      "",
      input.message,
    ].join("\n"),
  });
}

/** Stores the enquiry as a private `lead` post, so it shows up under Leads in WP admin. */
export async function createLead(input: ContactInput): Promise<void> {
  const graphql = process.env.WP_GRAPHQL_URL;
  if (!graphql) throw new Error("WP_GRAPHQL_URL is not set");
  const endpoint = new URL("/wp-json/wp/v2/leads", graphql);

  const res = await fetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: { "content-type": "application/json", authorization: wpAuthHeader() },
    body: JSON.stringify({
      title: input.company ? `${input.name} (${input.company})` : input.name,
      // Private: the REST API never lists private posts to anonymous visitors.
      status: "private",
      meta: {
        lead_name: input.name,
        lead_email: input.email,
        lead_company: input.company,
        lead_message: input.message,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(`Creating lead failed: ${res.status} ${await res.text().catch(() => "")}`.slice(0, 500));
  }
}
