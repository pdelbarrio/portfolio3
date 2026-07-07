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
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-accent-green text-xs hover:text-accent-neon cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex items-center justify-between">
        <h3 className="text-accent-green text-sm">{project.title}</h3>
        {project.status && (
          <span className="text-accent-amber text-xs">{project.status}</span>
        )}
      </div>

      {project.image && (
        <div className="max-w-[800px] mx-auto border border-accent-green/30 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <p className="text-sm leading-relaxed">{project.fullDescription}</p>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
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
                className="border border-accent-green text-accent-green px-3 py-1.5 text-sm hover:bg-accent-green/10 cursor-pointer"
              >
                ▶ {link.label}
              </button>
            ) : (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent-green text-accent-green px-3 py-1.5 text-sm hover:bg-accent-green/10"
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
