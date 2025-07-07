// ✅ Oplossing: gebruik een aparte Client Component voor hover-effecten op de knop
// Stap 1: Maak een nieuw bestand aan: `app/components/DownloadCard.tsx`

"use client";

import React from "react";

interface DownloadCardProps {
  title: string;
  client: string;
  date: string;
  filename: string;
}

export function DownloadCard({ title, client, date, filename }: DownloadCardProps) {
  const downloadUrl = `/zips/${filename}`;
  const pageUrl = `https://downloads.wouter.photo/${filename.split("__")[0]}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pageUrl);
    alert("Link gekopieerd naar klembord!");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "16px",
        backgroundColor: "#f4f4f4",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{title}</h1>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Klant:</strong> {client}
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        <strong>Datum:</strong> {date}
      </p>

      <a
        href={downloadUrl}
        download
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#007aff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        📥 Download ZIP
      </a>

      <pre
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          backgroundColor: "#2e2e2e",
          color: "#fff",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        <code>{pageUrl}</code>
      </pre>

      <button
        onClick={handleCopy}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1.25rem",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📋 Kopieer link
      </button>
    </div>
  );
}
