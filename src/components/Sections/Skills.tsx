"use client";

import { useTranslations } from "next-intl";
import { SkillTag } from "../Projects/SkillTag";

export function Skills() {
  const t = useTranslations("skills");

  const currentSkills = t.raw("current") as string[];
  const learningSkills = t.raw("learning") as string[];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-accent-green text-sm mb-3">{t("currentTitle")}</h3>
        <div className="flex flex-wrap gap-2">
          {currentSkills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-accent-amber text-sm mb-3">{t("learningTitle")}</h3>
        <div className="flex flex-wrap gap-2">
          {learningSkills.map((skill) => (
            <SkillTag key={skill} label={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
