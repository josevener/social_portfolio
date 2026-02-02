import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import BlogImages from "@/components/blog/BlogImages";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = posts.find(
    (p) => p.slug === slug
  );

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      {/* Header */}
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        <p className="text-muted-foreground text-base">
          {post.description}
        </p>
      </header>

      {/* Images */}
      <BlogImages images={post.images} />

      {/* Topics */}
      <section className="space-y-2">
        <h2 className="font-semibold">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {post.tech.map((t) => (
            <span
              key={t}
              className="text-xs bg-muted px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Content placeholder */}
      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          This is where your blog content will go.
          You can later replace this with MDX or
          rich content blocks.
        </p>
      </section>
    </main>
  );
}