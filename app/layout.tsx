import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display, Source_Serif_4, JetBrains_Mono, Fraunces, Inter } from "next/font/google";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteBackground } from "@/components/SiteBackground";
import { Footer } from "@/components/Footer";
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
  metadataBase: new URL("https://purpl.solutions"),
  title: "purpl solutions",
  description: "Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.",
  icons: {
    icon: "/brand/purpl_grain_transparent.png",
  },
  openGraph: {
    type: "website",
    siteName: "purpl solutions",
    title: "purpl solutions",
    description: "Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.",
    url: "https://purpl.solutions",
  },
  twitter: {
    card: "summary",
    title: "purpl solutions",
    description: "Purpl is a Sydney-based dev studio. We build for the web and turn ideas into implementation, fast.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "facebook-domain-verification": "visb0xz7wdnron2p6h5htnz47eojc9",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${playfair.variable} ${sourceSerif.variable} ${jetbrains.variable} ${fraunces.variable} ${inter.variable}`}
        style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif" }}
      >
        <SiteBackground />
        <GrainOverlay />
        {children}
        {modal}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "purpl solutions",
              url: "https://purpl.solutions",
              alternateName: "purpl.au",
              description: "Sydney-based dev studio building web and mobile apps. ABN 35 957 511 248.",
              foundingLocation: { "@type": "Place", name: "Sydney, Australia" },
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@purpl.au",
                contactType: "customer support",
              },
              sameAs: [
                "https://www.linkedin.com/company/purplsolutions",
                "https://purpl.au",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
