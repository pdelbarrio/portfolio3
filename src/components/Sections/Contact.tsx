"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    // TODO: connect to Resend/Formspree
    console.log("Form data:", data);
    setSent(true);
  }

  return (
    <div className="space-y-4 text-sm">
      {sent ? (
        <p className="text-accent-green">Message sent (demo)</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder={t("form.name")}
            required
            className="w-full bg-transparent border border-accent-green px-3 py-2 text-text-primary placeholder-text-dim outline-none focus:border-accent-neon text-sm"
          />
          <input
            name="email"
            type="email"
            placeholder={t("form.email")}
            required
            className="w-full bg-transparent border border-accent-green px-3 py-2 text-text-primary placeholder-text-dim outline-none focus:border-accent-neon text-sm"
          />
          <textarea
            name="message"
            placeholder={t("form.message")}
            required
            rows={4}
            className="w-full bg-transparent border border-accent-green px-3 py-2 text-text-primary placeholder-text-dim outline-none focus:border-accent-neon text-sm resize-none"
          />
          <button
            type="submit"
            className="border border-accent-green text-accent-green px-4 py-2 hover:bg-accent-green/10 cursor-pointer text-sm"
          >
            {t("form.send")}
          </button>
        </form>
      )}
    </div>
  );
}
