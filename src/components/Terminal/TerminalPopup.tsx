"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { About } from "../Sections/About";
import { Skills } from "../Sections/Skills";
import { Projects } from "../Sections/Projects";
import { Contact } from "../Sections/Contact";
import { Resume } from "../Sections/Resume";

export type SectionKey = "about" | "skills" | "projects" | "contact" | "cv";

interface TerminalPopupProps {
  section: SectionKey;
  onClose: () => void;
}

const sectionComponents: Record<SectionKey, React.ReactNode> = {
  about: <About />,
  skills: <Skills />,
  projects: <Projects />,
  contact: <Contact />,
  cv: <Resume />,
};

const sectionLabels: Record<SectionKey, string> = {
  about: "ABOUT",
  skills: "SKILLS",
  projects: "PROJECTS",
  contact: "CONTACT",
  cv: "CV",
};

export function TerminalPopup({ section, onClose }: TerminalPopupProps) {
  const t = useTranslations("site");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70"
          onClick={onClose}
        />
        <motion.div
          className="relative w-full h-dvh sm:h-auto sm:max-h-[85dvh] sm:max-w-[720px] sm:border sm:border-accent-green bg-bg-surface flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex items-center justify-between border-b border-accent-green px-4 py-2">
            <span className="text-accent-green text-sm">
              [{sectionLabels[section]}]
            </span>
            <button
              onClick={onClose}
              className="text-accent-green hover:text-text-primary text-sm cursor-pointer"
            >
              {t("close")}
            </button>
          </div>
          <div className="p-4 flex-1 overflow-y-auto sm:max-h-[70dvh]">
            {sectionComponents[section]}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
