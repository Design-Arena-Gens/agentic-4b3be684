import type { FC } from "react";

type Citation = {
  id: string;
  texto: string;
  fuente: string;
  autores: string;
  anio: number;
};

export const CitationsList: FC<{ citas: Citation[] }> = ({ citas }) => {
  if (!citas || citas.length === 0) return null;
  return (
    <div className="card p-4 mt-6">
      <h3 className="font-semibold">Referencias</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {citas.map((c) => (
          <li key={c.id}>
            <span className="font-medium">{c.autores}</span> ({c.anio}). {c.texto} ?{" "}
            <a className="text-brand-700 underline" href={c.fuente} target="_blank">
              PubMed
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

