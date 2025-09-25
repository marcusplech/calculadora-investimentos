import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de Investimentos - Grupo Primo",
  description:
    "Simule seus investimentos com nossa calculadora. Compare rendimentos entre Taxa Selic e Fundo Arca com juros compostos e aportes mensais. Ferramenta gratuita do Grupo Primo.",
  keywords:
    "calculadora investimentos, juros compostos, taxa selic, fundo arca, simulador financeiro",
  authors: [{ name: "Grupo Primo" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Header />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
