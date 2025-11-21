"use client";
import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { CitationsList } from "@/components/CitationsList";
import { Section } from "@/components/Section";
import { clsx } from "clsx";

type Result = {
  titulo: string;
  caption: string;
  bullets: string[];
  hashtags: string[];
  slides: null | { title: string; content: string }[];
  guion: null | string;
  citas: Array<{
    id: string;
    texto: string;
    fuente: string;
    autores: string;
    anio: number;
  }>;
};

export default function ClientPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const payload = {
        tema: String(formData.get("tema") || ""),
        objetivo: String(formData.get("objetivo") || "Hipertrofia"),
        audiencia: String(formData.get("audiencia") || "Principiantes"),
        plataforma: String(formData.get("plataforma") || "Instagram"),
        formato: String(formData.get("formato") || "Post"),
        tono: String(formData.get("tono") || "Educativo"),
        incluirCitas: formData.get("incluirCitas") === "on",
      };
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Error");
      setResult(json.data);
    } catch (e: any) {
      setError(e.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <div className="card p-4">
          <h2 className="font-semibold text-lg">Crea contenido basado en evidencia</h2>
          <p className="text-sm text-slate-600 mt-1">Ingresa tu tema y preferencia. El agente generar? captions, bullets y citas.</p>
          <form
            className="mt-4 grid gap-4"
            action={async (fd) => {
              await onSubmit(fd);
            }}
          >
            <div>
              <label className="block text-sm font-medium">Tema o idea</label>
              <input
                name="tema"
                required
                placeholder="Ej. C?mo ganar m?sculo siendo principiante"
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Objetivo</label>
                <select name="objetivo" className="mt-1 w-full rounded-lg border px-3 py-2">
                  <option>Hipertrofia</option>
                  <option>P?rdida de grasa</option>
                  <option>Fuerza</option>
                  <option>Salud general</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Audiencia</label>
                <select name="audiencia" className="mt-1 w-full rounded-lg border px-3 py-2">
                  <option>Principiantes</option>
                  <option>Intermedios</option>
                  <option>Avanzados</option>
                  <option>Mujeres</option>
                  <option>Mayores</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Plataforma</label>
                <select name="plataforma" className="mt-1 w-full rounded-lg border px-3 py-2">
                  <option>Instagram</option>
                  <option>TikTok</option>
                  <option>X</option>
                  <option>YouTube</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Formato</label>
                <select name="formato" className="mt-1 w-full rounded-lg border px-3 py-2">
                  <option>Post</option>
                  <option>Carrusel</option>
                  <option>Reel/Short</option>
                  <option>Historia</option>
                  <option>Guion Video</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Tono</label>
                <select name="tono" className="mt-1 w-full rounded-lg border px-3 py-2">
                  <option>Educativo</option>
                  <option>Motivacional</option>
                  <option>Divertido</option>
                  <option>Directo</option>
                </select>
              </div>
              <label className="flex items-center gap-2 mt-7">
                <input name="incluirCitas" type="checkbox" defaultChecked />
                <span className="text-sm">Incluir citas</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className={clsx("btn btn-primary", loading && "opacity-70")}
                disabled={loading}
              >
                {loading ? "Generando?" : "Generar"}
              </button>
              <button
                type="reset"
                className="btn btn-secondary"
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
              >
                Limpiar
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2">
                {error}
              </p>
            )}
          </form>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Consejo</h3>
          <p className="text-sm text-slate-600">S? espec?fico con el tema (ej. ?progresar en press banca 3x/sem?), as? el agente conecta mejor con estudios relevantes.</p>
        </div>
      </div>
      <div className="space-y-4">
        {!result ? (
          <div className="card p-6 text-slate-500">
            Genera para ver aqu? tus textos listos para copiar y pegar.
          </div>
        ) : (
          <>
            <Section
              title="Caption"
              actions={<CopyButton text={result.caption} />}
            >
              <pre className="whitespace-pre-wrap text-sm">{result.caption}</pre>
            </Section>

            <Section
              title="Puntos clave"
              actions={<CopyButton text={result.bullets.join("\n")} label="Copiar lista" />}
            >
              <ul className="list-disc pl-5 text-sm">
                {result.bullets.map((b, i) => {
                  const cleaned = b.replace(new RegExp("^[\\u2022\\-]\\s*"), "");
                  return <li key={i}>{cleaned}</li>;
                })}
              </ul>
            </Section>

            {result.slides && (
              <Section
                title="Carrusel (borrador)"
                actions={
                  <CopyButton
                    text={result.slides.map((s) => `${s.title}\n${s.content}`).join("\n\n")}
                    label="Copiar carrusel"
                  />
                }
              >
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  {result.slides.map((s, i) => (
                    <li key={i}>
                      <div className="font-medium">{s.title}</div>
                      <div className="text-slate-700">{s.content}</div>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {result.guion && (
              <Section title="Guion" actions={<CopyButton text={result.guion} />}>
                <pre className="whitespace-pre-wrap text-sm">{result.guion}</pre>
              </Section>
            )}

            <CitationsList citas={result.citas} />
          </>
        )}
      </div>
    </div>
  );
}

