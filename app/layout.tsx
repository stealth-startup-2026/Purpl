import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display, Source_Serif_4, JetBrains_Mono, Fraunces, Inter } from "next/font/google";
import { GrainOverlay } from "@/components/GrainOverlay";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "purpl.solutions",
  description: "Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.",
  icons: {
    icon: "/brand/purpl_grain_transparent.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${playfair.variable} ${sourceSerif.variable} ${jetbrains.variable} ${fraunces.variable} ${inter.variable}`}
        style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif" }}
      >
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
