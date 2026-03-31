"use client";

import { FormEvent, useState } from "react";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`);
    const body = encodeURIComponent(
      [`Name: ${name || "Not provided"}`, email ? `Email: ${email}` : null, "", "Message:", message]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-8 shadow-panel md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="section-label">Contact</p>
            <h2 className="section-heading max-w-xl">
              If the team is ambitious, product-minded, and shipping fast, I’m interested.
            </h2>
            <p className="section-copy max-w-xl">
              Reach out for backend, platform, AI product, or full-stack roles. I’m
              especially excited by teams that care about both technical rigor and user
              experience quality.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-muted">
              <p>{portfolio.location}</p>
              <SocialLinks />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="form-field">
                  <span>Name</span>
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label className="form-field">
                  <span>Email (optional)</span>
                  <input name="email" type="email" placeholder="name@company.com" />
                </label>
              </div>
              <label className="form-field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell me about the role, the team, or the product challenge."
                  required
                />
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 bg-brand/90 px-6 text-sm font-medium text-ink shadow-glow transition hover:bg-brand"
                >
                  Send Intro
                </button>
                {submitted ? <p className="text-sm text-muted">Opening your default mail client now.</p> : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
