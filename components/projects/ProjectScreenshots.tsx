"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";

type Screenshot = {
  src: string;
  alt: string;
};

type Props = {
  screenshots?: Screenshot[];
};

export default function ProjectScreenshots({ screenshots }: Props) {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  const [hero, ...rest] = screenshots;

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
          <DialogTrigger asChild onClick={() => setSelectedImage(hero)}>
            <div className="sm:col-span-2 relative aspect-video rounded-2xl overflow-hidden border bg-muted glass-card group cursor-zoom-in">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
              </div>
            </div>
          </DialogTrigger>

          {/* Remaining screenshots */}
          {rest.map((shot, index) => (
            <DialogTrigger asChild key={index} onClick={() => setSelectedImage(shot)}>
              <div
                className="relative aspect-video rounded-2xl overflow-hidden border bg-muted glass-card group cursor-zoom-in"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 w-6" />
                </div>
              </div>
            </DialogTrigger>
          ))}
        </div>

        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none">
          <DialogTitle className="sr-only">Screenshot Preview</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}