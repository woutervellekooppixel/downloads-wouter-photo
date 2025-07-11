"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import { Download as DownloadIcon, Search } from "lucide-react";
import Image from "next/image";

interface GallerySectionProps {
  title: string;
  files: {
    name: string;
    path: string;
  }[];
}

export default function GallerySection({ title, files }: GallerySectionProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-black text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((file, i) => (
          <div key={file.path} className="relative group">
            <Image
              src={file.path}
              alt={file.name}
              width={800}
              height={800}
              className="object-cover w-full aspect-[3/2] rounded"
              onClick={() => window.innerWidth > 768 && setIndex(i)}
            />
            {/* Desktop icons on hover */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-center gap-3 bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <a
                href={file.path}
                download
                className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
              >
                <DownloadIcon size={20} />
              </a>
              <button
                onClick={() => setIndex(i)}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Mobiel downloadknop altijd zichtbaar */}
            <div className="sm:hidden absolute bottom-2 right-2">
              <a
                href={file.path}
                download
                className="bg-white text-black p-2 rounded-full shadow-md"
              >
                <DownloadIcon size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox op desktop */}
      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        index={index ?? 0}
        slides={files.map((f) => ({ src: f.path }))}
        plugins={[Download]}
      />
    </div>
  );
}