"use client";

import { useState } from "react";
// ...bovenin van je bestand (indien nog niet toegevoegd)

export default function Page() {
  // ...je bestaande ZIP uitleescode hier...

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Downloads</h1>

      {items.map((item, index) => {
        const url = `https://downloads.wouter.photo/zips/${item.filename}`;

        return (
          <div key={item.filename} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              {item.title}
            </h2>
            <p>
              <strong>Klant:</strong> {item.client} <br />
              <strong>Datum:</strong> {item.date}
            </p>

            <a
              href={`/zips/${item.filename}`}
              download
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor: "#000",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
                marginTop: "0.5rem",
              }}
            >
              📥 Download ZIP
            </a>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                  overflowX: "auto",
                  flex: 1,
                  marginRight: "0.5rem",
                }}
              >
                {url}
              </pre>
              <button
                onClick={() => handleCopy(url, index)}
                style={{
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  backgroundColor: "#eee",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {copiedIndex === index ? "✓" : "📋"}
              </button>
            </div>
          </div>
        );
      })}
    </main>
  );
}