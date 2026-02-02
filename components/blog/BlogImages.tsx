import Image from "next/image";

type ImageItem = {
  src: string;
  alt: string;
};

type Props = {
  images?: ImageItem[];
};

export default function BlogImages({ images }: Props) {
  if (!images || images.length === 0) return null;

  const [hero, ...rest] = images;

  return (
    <section className="space-y-4">
      {/* Hero image */}
      <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Inline images */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((img, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden border bg-muted"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}