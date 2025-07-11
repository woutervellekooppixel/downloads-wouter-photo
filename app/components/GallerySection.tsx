"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/download.css";

interface GallerySectionProps {
  title: string;
  files: { name: string; path: string }[];
}

export default function GallerySection({ title, files }: GallerySectionProps) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = files.map((f) => ({
    src: f.path,
    downloadUrl: f.path,
  }));

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={file.path}
            className="relative group overflow-hidden rounded shadow"
          >
            <Image
              src={file.path}
              alt={file.name}
              width={800}
              height={600}
              loading="lazy"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay-buttons */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4 md:gap-6">
              {!isMobile && (
                <button
                  onClick={() => {
                    setPhotoIndex(index);
                    setOpen(true);
                  }}
                  title="Bekijk groter"
                  className="bg-white text-black rounded-full p-2 text-xl shadow hover:bg-gray-200 transition"
                >
                  🔍
                </button>
              )}
              <a
                href={file.path}
                download
                title="Download deze foto"
                className="bg-white text-black rounded-full p-2 text-xl shadow hover:bg-gray-200 transition"
              >
                ⬇
              </a>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Download]}
      />
    </div>
  );
}