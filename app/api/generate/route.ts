import { NextResponse } from "next/server";
import { z } from "zod";
import { generateContent, type GenerateInput } from "@/lib/generator";

const schema = z.object({
  tema: z.string().min(3).max(120),
  objetivo: z.enum(["Hipertrofia", "P?rdida de grasa", "Fuerza", "Salud general"]),
  audiencia: z.enum(["Principiantes", "Intermedios", "Avanzados", "Mujeres", "Mayores"]),
  plataforma: z.enum(["Instagram", "TikTok", "X", "YouTube"]),
  formato: z.enum(["Post", "Carrusel", "Reel/Short", "Historia", "Guion Video"]),
  tono: z.enum(["Educativo", "Motivacional", "Divertido", "Directo"]),
  incluirCitas: z.boolean().default(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = schema.parse(body) as GenerateInput;
    const result = generateContent(input);
    return NextResponse.json({ ok: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message ?? "Error" },
      { status: 400 }
    );
  }
}

