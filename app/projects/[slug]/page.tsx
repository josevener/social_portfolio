import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import { Post, ProjectPost } from "@/types/post";

function isProject(post: Post): post is ProjectPost {
  return post.type === "project";
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = posts
    .filter(isProject)
    .find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>

      <p className="text-muted-foreground">
        {project.description}
      </p>

      <section>
        <h2 className="font-semibold mb-2">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-sm bg-muted px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Highlights</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Production-ready implementation</li>
          <li>Reusable architecture</li>
          <li>Security-focused design</li>
        </ul>
      </section>
    </main>
  );
}