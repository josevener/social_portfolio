import Image from "next/image";

type Screenshot = {
  src: string;
  alt: string;
};

type Props = {
  screenshots?: Screenshot[];
};

export default function ProjectScreenshots({ screenshots }: Props) {
  if (!screenshots || screenshots.length === 0) return null;

  const [hero, ...rest] = screenshots;

  return (
    <section className="space-y-4">
      <h2 className="font-semibold">Screenshots</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Hero image */}
        <div className="sm:col-span-2 relative aspect-video rounded-lg overflow-hidden border bg-muted">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Remaining screenshots */}
        {rest.map((shot, index) => (
          <div
            key={index}
            className="relative aspect-video rounded-lg overflow-hidden border bg-muted"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}