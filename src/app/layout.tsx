import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query.provider";
import { Sidebar } from "@/ui/organisms/Sidebar/Sidebar-full";

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

const primaryLinks = [
  { label: "Pedidos", href: "/" },
  { label: "Clientes", href: "/clients" },
];
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
            <Sidebar links={primaryLinks} />

            <div className="app-shell__content">
              <div className="content-scroll">{children}</div>
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
