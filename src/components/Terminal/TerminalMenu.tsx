"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Cursor } from "./Cursor";
import { TerminalPopup, type SectionKey } from "./TerminalPopup";

const sections: SectionKey[] = ["about", "skills", "projects", "contact", "cv"];

export function TerminalMenu() {
  const t = useTranslations("site");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openSection, setOpenSection] = useState<SectionKey | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (openSection) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : sections.length - 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < sections.length - 1 ? prev + 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          setOpenSection(sections[selectedIndex]);
          break;
      }
    },
    [openSection, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const separator = "─".repeat(48);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl tracking-wider text-text-primary">
              {t("title")}
            </h1>
            <p className="text-text-dim text-sm mt-1 flex items-center justify-center gap-1">
              {t("subtitle")}
              <Cursor />
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => router.replace(pathname, { locale: "es" })}
                className={`text-xs px-2 py-0.5 cursor-pointer ${
                  locale === "es"
                    ? "text-accent-green border border-accent-green"
                    : "text-text-dim hover:text-text-primary"
                }`}
                disabled={locale === "es"}
              >
                ES
              </button>
              <button
                onClick={() => router.replace(pathname, { locale: "en" })}
                className={`text-xs px-2 py-0.5 cursor-pointer ${
                  locale === "en"
                    ? "text-accent-green border border-accent-green"
                    : "text-text-dim hover:text-text-primary"
                }`}
                disabled={locale === "en"}
              >
                EN
              </button>
            </div>
          </div>

          <div className="text-text-dim text-center text-xs mb-4 select-none">
            {separator}
          </div>

          <nav className="space-y-2">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => {
                  setSelectedIndex(index);
                  setOpenSection(section);
                }}
                className={`w-full text-left flex items-center gap-2 px-4 py-2 text-sm transition-colors cursor-pointer ${
                  index === selectedIndex
                    ? "text-accent-green"
                    : "text-text-primary hover:text-accent-green/60"
                }`}
              >
                <span className="w-4">
                  {index === selectedIndex && <span>▸</span>}
                </span>
                <span>{t(`nav.${section}`)}</span>
              </button>
            ))}
          </nav>

          <div className="text-text-dim text-center text-xs mt-8 select-none">
            {separator}
          </div>

          <p className="text-text-dim text-center text-xs mt-4 hidden sm:block">
            {t("hint")}
          </p>
        </div>
      </div>

      {openSection && (
        <TerminalPopup
          section={openSection}
          onClose={() => setOpenSection(null)}
        />
      )}
    </>
  );
}
