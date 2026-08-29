import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-canela",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://attiks.in"),
  title: {
    default: "ATTIKS | Modern Architectural Masterpieces",
    template: "%s | ATTIKS Architecture",
  },
  description:
    "Attiks Architecture is a premier Kerala-based practice creating contextual, enduring architecture shaped by climate, material, and spatial experience across residential, commercial, and cultural domains.",
  keywords: [
    "Attiks Architecture",
    "Kerala Architecture Firm",
    "Luxury Residential Design",
    "Contemporary Architecture",
    "Contextual Architecture",
    "Sustainable Design",
    "Kochi Architects",
    "Commercial Architecture",
  ],
  authors: [{ name: "Attiks Architecture" }],
  creator: "Attiks Architecture",
  publisher: "Attiks Architecture",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ATTIKS | Modern Architectural Masterpieces",
    description:
      "Bespoke architectural design and luxury spatial experiences tailored to climate and context.",
    url: "https://attiks.in",
    siteName: "ATTIKS Architecture",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/villa_showcase.webp",
        width: 1200,
        height: 630,
        alt: "ATTIKS Architecture Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATTIKS | Modern Architectural Masterpieces",
    description:
      "Contextual, enduring architecture shaped by climate, material, and the experience of space.",
    images: ["/villa_showcase.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo-light.png", type: "image/png" },
    ],
    apple: [{ url: "/images/logo-light.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ATTIKS Architecture",
  description:
    "A Kerala-based architecture practice shaping contextual, enduring spaces informed by climate, material, and spatial experience.",
  url: "https://attiks.in",
  logo: "https://attiks.in/images/logo-light.png",
  image: "https://attiks.in/villa_showcase.webp",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "#1/523, Krishna Building, NH 66, Azhinhilam PO",
      addressLocality: "Calicut",
      postalCode: "673632",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
  ],
  telephone: "+91-0483-2941308",
  email: "info@attiks.in",
  areaServed: ["Kerala", "Bangalore", "Dubai", "India"],
  priceRange: "$$$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link
          rel="preload"
          href="/villa_showcase.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
