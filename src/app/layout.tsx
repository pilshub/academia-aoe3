import type { Metadata } from "next";
import { Cinzel, Crimson_Text, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Academia AoE3 · Decks, shipments y planes con intención",
  description:
    "Plataforma editorial para Age of Empires III: Definitive Edition. 22 civilizaciones, planes con deck + opening + ramas + benchmarks, Coach IA con guardrails y fuentes verificables.",
  icons: {
    icon: "/landing-assets/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
