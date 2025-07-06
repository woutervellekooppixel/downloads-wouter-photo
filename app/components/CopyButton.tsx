'use client';

import { useState } from "react";

type Props = {
  text: string;
};

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // melding verdwijnt na 2 seconden
    } catch (err) {
      console.error("Kopiëren mislukt:", err);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        📋 Kopieer link
      </button>

      {copied && (
        <span
          style={{
            display: "inline-block",
            marginLeft: "1rem",
            color: "green",
            fontSize: "0.9rem",
          }}
        >
          ✅ Gekopieerd!
        </span>
      )}
    </div>
  );
}