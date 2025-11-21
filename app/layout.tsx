import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agente Fitness: Contenido con evidencia",
  description:
    "Genera contenido para redes sobre entrenamiento y nutrici?n basado en estudios",
  metadataBase: new URL("https://agentic-4b3be684.vercel.app"),
  openGraph: {
    title: "Agente Fitness",
    description:
      "Crea posts, captions y guiones basados en evidencia cient?fica",
    url: "https://agentic-4b3be684.vercel.app",
    siteName: "Agente Fitness",
    locale: "es_ES",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className + " bg-white text-slate-900"}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-brand-600" />
                <span className="font-semibold">Agente Fitness</span>
              </div>
              <nav className="text-sm text-slate-600">
                <a
                  href="https://agentic-4b3be684.vercel.app"
                  className="hover:text-slate-900"
                >
                  Producci?n
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
            {children}
          </main>
          <footer className="border-t py-6 text-center text-sm text-slate-500">
            Construido para crear contenido ?til, claro y con referencias.
          </footer>
        </div>
      </body>
    </html>
  );
}

