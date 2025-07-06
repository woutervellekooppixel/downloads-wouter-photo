'use client';

type Props = {
  text: string;
};

export default function CopyButton({ text }: Props) {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
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
  );
}