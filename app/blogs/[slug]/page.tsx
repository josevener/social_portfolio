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
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

      {/* Topics */}
      <div className="flex flex-wrap gap-2">
        {post.tech.map((t) => (
          <span key={t} className="text-xs bg-muted px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground border-y border-border py-4">
        <span>By {post.author}</span>
        <span>•</span>
        <span>{post.publishedAt}</span>
      </div>

      {/* Images */}
      <BlogImages images={post.images} />

      {/* Introduction */}
      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-xl text-foreground/90 font-medium leading-relaxed">
          {post.introduction}
        </p>
      </section>

      {/* Sections */}
      <div className="space-y-12">
        {post.sections.map((section, sIndex) => (
          <section key={sIndex} className="space-y-4">
            {section.heading && (
              <h2 className="text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {section.content.map((p, pIndex) => (
                <p key={pIndex}>{p}</p>
              ))}
            </div>

            {section.list && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {section.list.ordered ? (
                  <ol>
                    {section.list.items.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul>
                    {section.list.items.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {section.code && (
              <div className="relative group">
                {section.code.filename && (
                  <div className="text-xs text-muted-foreground mb-1 font-mono">
                    {section.code.filename}
                  </div>
                )}
                <pre className="p-4 rounded-lg bg-muted/50 overflow-x-auto border border-border/50 text-sm font-mono">
                  <code>{section.code.snippet}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Conclusion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-border/50 space-y-3">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p>{post.conclusion}</p>
        </div>
      </section>
    </main>
  );
}
