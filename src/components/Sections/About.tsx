"use client";

import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed">{t("text")}</p>
      <div className="flex flex-wrap gap-4 text-sm">
        <a
          href={t("links.linkedin")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-green underline underline-offset-2 hover:text-accent-neon"
        >
          LinkedIn
        </a>
        <a
          href={t("links.github")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-green underline underline-offset-2 hover:text-accent-neon"
        >
          GitHub
        </a>
        <a
          href={`mailto:${t("links.email")}`}
          className="text-accent-green underline underline-offset-2 hover:text-accent-neon"
        >
          {t("links.email")}
        </a>
      </div>
    </div>
  );
}
