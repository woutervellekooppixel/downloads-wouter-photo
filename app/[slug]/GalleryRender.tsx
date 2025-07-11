"use client";

import dynamic from "next/dynamic";

// Dynamisch importeren met SSR uit
const GallerySection = dynamic(() => import("@/components/GallerySection"), {
  ssr: false,
});

type FileItem = {
  name: string;
  path: string;
};

type Section = {
  title: string;
  files: FileItem[];
};

type Props = {
  imageSections: Section[];
};

export default function GalleryRender({ imageSections }: Props) {
  return (
    <>
      {imageSections.map((section) => (
        <GallerySection
          key={section.title}
          title={section.title}
          files={section.files}
        />
      ))}
    </>
  );
}