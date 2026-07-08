"use client";

import { SkillTag } from "./SkillTag";

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectDetailProps {
  project: {
    title: string;
    fullDescription: string;
    image: string | null;
    imageOrientation?: "horizontal" | "vertical";
    tags: string[];
    links: ProjectLink[];
    status?: string;
  };
  onBack: () => void;
  onPlayVideo: (url: string) => void;
}

function isVideoLink(label: string, url: string) {
  return label === "Video" || url.includes("vimeo.com");
}

export function ProjectDetail({
  project,
  onBack,
  onPlayVideo,
}: ProjectDetailProps) {
  const isVertical = project.imageOrientation === "vertical";

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden">
      <button
        onClick={onBack}
        className="text-accent-green text-xs hover:text-accent-neon cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex items-center justify-between">
        <h3 className="text-accent-green text-sm truncate">{project.title}</h3>
        {project.status && (
          <span className="text-accent-amber text-xs flex-shrink-0 ml-2">{project.status}</span>
        )}
      </div>

      <div
        className={`gap-6 ${isVertical ? "grid grid-cols-1 md:grid-cols-2 items-start" : "space-y-4"}`}
      >
        {project.image && (
          <div
            className={`border border-accent-green/30 overflow-hidden w-full ${
              isVertical
                ? "max-w-full md:max-w-87.5 mx-auto md:mx-0 justify-self-center"
                : "max-w-full md:max-w-200 mx-auto"
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover max-w-full"
              loading="lazy"
            />
          </div>
        )}

        <p className="text-sm leading-relaxed break-words">{project.fullDescription}</p>
      </div>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <SkillTag key={tag} label={tag} />
          ))}
        </div>
      )}

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) =>
            isVideoLink(link.label, link.url) ? (
              <button
                key={link.label}
                onClick={() => onPlayVideo(link.url)}
                className="border border-accent-green text-accent-green px-3 py-1.5 text-sm hover:bg-accent-green/10 cursor-pointer flex-shrink-0"
              >
                ▶ {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent-green text-accent-green px-3 py-1.5 text-sm hover:bg-accent-green/10 flex-shrink-0"
              >
                {link.label} ↗
              </a>
            ),
          )}
        </div>
      )}
    </div>
  );
}
