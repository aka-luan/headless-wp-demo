"use client";

import { useId, useState, type FormEvent } from "react";

import type { ContactFormBlockFragment } from "@/lib/wp/__generated__/graphql";
import { Section, SectionHeading } from "@/components/ui/Container";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const inputClass =
  "mt-2 block w-full rounded-control border border-border bg-bg px-3.5 py-2.5 text-fg shadow-sm placeholder:text-subtle focus:border-accent focus:outline-2 focus:outline-accent";

export function ContactForm({ block }: { block: ContactFormBlockFragment }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const headingId = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (res.ok) {
        form.reset();
        setStatus({ state: "sent" });
        return;
      }
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus({ state: "error", message: body?.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "Network error. Check your connection and try again." });
    }
  }

  return (
    <Section aria-labelledby={block.heading ? headingId : undefined}>
      <SectionHeading id={headingId} heading={block.heading} intro={block.intro} />
      <div className="mx-auto mt-12 max-w-xl">
        {status.state === "sent" ? (
          <p role="status" className="rounded-card border border-border bg-surface p-8 text-center text-lg">
            {block.successMessage || "Thanks! We'll be in touch soon."}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Name
              <input name="name" required maxLength={100} autoComplete="name" className={inputClass} />
            </label>
            <label className="text-sm font-medium">
              Work email
              <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Company <span className="font-normal text-subtle">(optional)</span>
              <input name="company" maxLength={100} autoComplete="organization" className={inputClass} />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Message
              <textarea name="message" required minLength={10} maxLength={5000} rows={5} className={inputClass} />
            </label>
            {/* Honeypot: hidden from people, filled in by naive bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status.state === "sending"}
                className="inline-flex w-full items-center justify-center rounded-control bg-accent px-5 py-3 font-medium text-accent-fg shadow-sm transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>
              <p aria-live="polite" className="mt-3 min-h-5 text-sm text-red-700">
                {status.state === "error" ? status.message : ""}
              </p>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
