"use client";

import { useId, useState, type FormEvent } from "react";

import type { ContactFormBlockFragment } from "@/lib/wp/__generated__/graphql";
import { buttonBase } from "@/components/ui/Button";
import { Section } from "@/components/ui/Container";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const inputClass =
  "mt-2 block w-full rounded-control border-[1.5px] border-border bg-bg px-3.5 py-3 font-normal [font-stretch:100%] text-fg placeholder:text-subtle hover:border-subtle focus:border-accent focus:outline-2 focus:outline-accent";

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
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {block.heading && (
            <h2 id={headingId} className="font-display text-display-md">
              {block.heading}
            </h2>
          )}
          {block.intro && <p className="mt-6 max-w-md text-lg text-pretty text-muted">{block.intro}</p>}
        </div>
        <div className="rounded-card border border-border bg-surface p-6 sm:p-10 lg:col-span-7">
          {status.state === "sent" ? (
            <p role="status" className="font-display text-display-sm">
              {block.successMessage || "Thanks! We'll be in touch soon."}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
              <label className="font-label text-sm">
                Name
                <input name="name" required maxLength={100} autoComplete="name" className={inputClass} />
              </label>
              <label className="font-label text-sm">
                Work email
                <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} />
              </label>
              <label className="font-label text-sm sm:col-span-2">
                Company <span className="font-normal [font-stretch:100%] text-subtle">(optional)</span>
                <input name="company" maxLength={100} autoComplete="organization" className={inputClass} />
              </label>
              <label className="font-label text-sm sm:col-span-2">
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
                  className={`${buttonBase} h-13 w-full bg-accent px-6 text-accent-fg hover:bg-accent-hover disabled:opacity-60`}
                >
                  {status.state === "sending" ? "Sending…" : "Send message"}
                </button>
                <p aria-live="polite" className="mt-3 min-h-5 text-sm text-danger">
                  {status.state === "error" ? status.message : ""}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
