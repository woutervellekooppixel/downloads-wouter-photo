"use client";

import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Initieel checken
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

return (
  <div className="px-4 sm:px-0">
    <h2 className="text-black text-2xl font-bold mb-4">{title}</h2>
    ...

      <div
        className={`grid gap-4 ${
          isMobile ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        }`}
      >
        {files.map((file, i) => (
          <div key={file.path} className="relative group">
            {isMobile ? (
              // 📱 Mobiel: klik = download
              <a href={file.path} download>
                <Image
                  src={file.path}
                  alt={file.name}
                  width={800}
                  height={800}
                  className="object-cover w-full aspect-[3/2] rounded"
                />
              </a>
            ) : (
              // 💻 Desktop: klik = open Lightbox
              <>
                <Image
                  src={file.path}
                  alt={file.name}
                  width={800}
                  height={800}
                  className="object-cover w-full aspect-[3/2] rounded cursor-pointer"
                  onClick={() => setIndex(i)}
                />

                {/* Hover icons */}
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
              </>
            )}
          </div>
        ))}
      </div>

      {/* 💡 Alleen op desktop */}
      {!isMobile && (
        <Lightbox
          open={index !== null}
          close={() => setIndex(null)}
          index={index ?? 0}
          slides={files.map((f) => ({ src: f.path }))}
          plugins={[Download]}
        />
      )}
    </div>
  );
}