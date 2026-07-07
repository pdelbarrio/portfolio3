"use client";

import { useTranslations } from "next-intl";

export function Resume() {
  const t = useTranslations("cv");

  return (
    <div className="space-y-4 text-sm">
      <a
        href="https://res.cloudinary.com/getoutbcn/image/upload/v1783413329/PablodelBarrioSpanishCV2026_zy930k.pdf"
        target="_blank"
        className="block border border-accent-green text-accent-green px-4 py-3 hover:bg-accent-green/10 text-center"
      >
        {t("spanish")}
      </a>
      <a
        href="https://res.cloudinary.com/getoutbcn/image/upload/v1783413329/PablodelBarrioEnglishCV2026_i9j87k.pdf"
        target="_blank"
        className="block border border-accent-green text-accent-green px-4 py-3 hover:bg-accent-green/10 text-center"
      >
        {t("english")}
      </a>
    </div>
  );
}
