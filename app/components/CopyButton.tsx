'use client';

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      style={{
        background: "#eee",
        border: "none",
        padding: "0.3rem 0.6rem",
        cursor: "pointer",
      }}
    >
      Kopieer
    </button>
  );
}
