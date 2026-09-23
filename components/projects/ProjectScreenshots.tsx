"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getNextGalleryIndex,
  getPreviousGalleryIndex,
} from "@/lib/gallery-navigation.mjs";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

type Screenshot = {
  src: string;
  alt: string;
};

type Props = {
  screenshots?: Screenshot[];
};

export default function ProjectScreenshots({ screenshots }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  const [hero, ...rest] = screenshots;
  const selectedImage = screenshots[selectedIndex];
  const hasMultipleImages = screenshots.length > 1;

  // Wrap around the gallery so visitors can keep comparing screens without reaching a dead end.
  const showPreviousImage = () => {
    setSelectedIndex(
      (currentIndex) =>
        getPreviousGalleryIndex(currentIndex, screenshots.length)
    );
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) => getNextGalleryIndex(currentIndex, screenshots.length));
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Gallery</h2>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Click to enlarge
        </p>
      </div>

      <Dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Hero image */}
          <DialogTrigger asChild onClick={() => setSelectedIndex(0)}>
            <button
              type="button"
              className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl border bg-muted text-left glass-card sm:col-span-2"
              aria-label={`Preview ${hero.alt}`}
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </button>
          </DialogTrigger>

          {/* Remaining screenshots */}
          {rest.map((shot, index) => (
            <DialogTrigger
              asChild
              key={shot.src}
              onClick={() => setSelectedIndex(index + 1)}
            >
              <button
                type="button"
                className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl border bg-muted text-left glass-card"
                aria-label={`Preview ${shot.alt}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-contain"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 w-6" />
                </div>
              </button>
            </DialogTrigger>
          ))}
        </div>

        <DialogContent
          className="max-w-[calc(100vw-2rem)] gap-3 border-none bg-transparent p-0 shadow-none sm:max-w-4xl [&>button]:bg-black/60 [&>button]:text-white [&>button]:opacity-100"
          onKeyDown={(event) => {
            if (hasMultipleImages && event.key === "ArrowLeft") {
              showPreviousImage();
            }

            if (hasMultipleImages && event.key === "ArrowRight") {
              showNextImage();
            }
          }}
        >
          <DialogTitle className="sr-only">Screenshot Preview</DialogTitle>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/90">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain animate-in fade-in duration-200"
              sizes="(min-width: 1024px) 1120px, 96vw"
              priority
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Show previous image"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Show next image"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            )}

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white" aria-live="polite">
              {selectedIndex + 1} of {screenshots.length}
            </p>
          </div>

          {hasMultipleImages && (
            <div className="flex justify-center gap-2 overflow-x-auto pb-1" aria-label="Choose a gallery image">
              {screenshots.map((screenshot, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={screenshot.src}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`relative h-14 w-24 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-16 sm:w-28 ${
                      isSelected
                        ? "border-primary opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Show image ${index + 1}: ${screenshot.alt}`}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <Image
                      src={screenshot.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
