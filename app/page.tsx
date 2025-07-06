"use client";

import { useState } from "react";
import fs from "fs";
import path from "path";

export default function Page() {
  const zipDir = path.join(process.cwd(), "public", "zips");
  const files = fs.readdirSync(zipDir);

  const items = files
    .filter((file) => file.endsWith(".zip"))
    .map((file) => {
      const [slug, title, client, rawDate] = file.replace(".zip", "").split("__");
      const date = new Date(rawDate).toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        slug,
        title,
        client,
        date,
        filename: file,
      };
    });

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Downloads</h1>

      {items.map((item, index) => {
        const url = `https://downloads.wouter.photo/zips/${item.filename}`;

        return (
          <div
            key={item.slug}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "2rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{item.title}</h2>
            <p>
              <strong>Klant:</strong> {item.client}
              <br />
              <strong>Datum:</strong> {item.date}
            </p>

            <pre
              style={{
                background: "#eee",
                padding: "1rem",
                borderRadius: "4px",
                overflowX: "auto",
                marginTop: "1rem",
                fontSize: "0.9rem",
              }}
            >
              <code>{url}</code>
            </pre>

            <button
              onClick={() => handleCopy(url, index)}
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {copiedIndex === index ? "✅ Gekopieerd!" : "📋 Kopieer link"}
            </button>
          </div>
        );
      })}
    </main>
  );
}