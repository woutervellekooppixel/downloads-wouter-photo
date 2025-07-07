/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const slugs = fs.readdirSync(photosDir).filter((name) => {
    const fullPath = path.join(photosDir, name);
    return fs.statSync(fullPath).isDirectory();
  });

  return slugs.map((slug) => ({ slug }));
}

export default function Page(props: any) {
  const slug = props.params.slug;
  const photoDir = path.join(process.cwd(), "public", "photos", slug);

  if (!fs.existsSync(photoDir)) {
    notFound();
  }

  const files = fs
    .readdirSync(photoDir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

  if (files.length === 0) {
    return <p style={{ padding: "2rem" }}>Geen foto&apos;s gevonden voor {slug}.</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0f0f0, #ffffff)",
        fontFamily: "sans-serif",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          width: "100%",
          background: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
          📸 Download jouw foto&apos;s
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {files.map((file) => (
            <div key={file} style={{ textAlign: "center" }}>
              <Image
                src={`/photos/${slug}/${file}`}
                alt={file}
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <a
                href={`/photos/${slug}/${file}`}
                download
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "#000",
                  color: "#fff",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                ⬇️ Download
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href={`/api/download-zip?slug=${slug}`}
            style={{
              background: "#007aff",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            📦 Download alles als ZIP
          </Link>
        </div>
      </div>
    </div>
  );
}
