"use client";
import { useState } from "react";

export function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn btn-secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      aria-label="Copiar al portapapeles"
    >
      {copied ? "Copiado ?" : label}
    </button>
  );
}

