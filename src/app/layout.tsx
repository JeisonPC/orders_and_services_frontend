import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App de orders and services",
  description: "Creada por Jeison Poveda",
};

const primaryLinks = [{ label: "Pedidos", href: "/" }];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <div className="app-shell">
            <aside className="sidebar">
              <div className="sidebar__brand">
                <span className="sidebar__tag">RoR</span>
                <strong>Órdenes & Servicios</strong>
                <p>Tablero operativo para monitorear clientes estratégicos.</p>
              </div>

              <div className="sidebar__section">
                <ul className="sidebar__menu">
                  {primaryLinks.map((link, index) => (
                    <li key={link.href}>
                      <a
                        className={`sidebar__link${index === 0 ? " is-active" : ""}`}
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar__footer">
                <p>¿Nuevo requerimiento?</p>
                <button type="button">Crear orden</button>
              </div>
            </aside>

            <div className="app-shell__content">
              <header className="app-shell__topbar">
                <div>
                  <p className="topbar__eyebrow">Panel operativo</p>
                  <h1>Órdenes y servicios</h1>
                </div>
                <div className="topbar__actions">
                  <button type="button">Buscar cliente</button>
                  <button type="button" className="ghost">
                    Filtros
                  </button>
                </div>
              </header>
              <div className="content-scroll">{children}</div>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
