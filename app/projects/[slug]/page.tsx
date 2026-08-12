import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import TagBadges from "@/components/common/TagBadges";
import TechBadgeOverflow from "@/components/common/TechBadgeOverflow";
import ProjectScreenshots from "@/components/projects/ProjectScreenshots";
import { projects } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    keywords: project.tags?.join(", "),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:space-y-10 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <TagBadges tags={project.tags} />
        <p className="max-w-3xl text-base text-muted-foreground">
          {project.description}
        </p>
        {project.liveUrl && (
          <div>
            {/* This CTA keeps live deployments easy to reach without changing the experience for every project. */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Visit Live Project
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </header>

      {Array.isArray(project.screenshots) && project.screenshots.length > 0 && (
        <ProjectScreenshots screenshots={project.screenshots} />
      )}

      {/* Context stays optional so academic and professional work can share the same template cleanly. */}
      {project.context && (
        <div className="space-y-1 rounded-lg border bg-muted/40 p-4">
          <p className="font-medium text-foreground">{project.context.program}</p>
          <p className="text-sm text-muted-foreground">
            {project.context.institution} | {project.context.period}
          </p>
        </div>
      )}

      {project.content && (
        <section className="space-y-4">
          {project.content.map((paragraph, index) => (
            <p key={index} className="text-md leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      <div className="h-px bg-border" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          {project.problem && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Problem</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Solution</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.solution}
              </p>
            </div>
          )}

          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Key Highlights</h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <TechBadgeOverflow tech={project.tech} limit={10} />
        </aside>
      </div>
    </main>
  );
}
