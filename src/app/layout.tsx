import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATTIXS | Modern Architectural Masterpieces",
  description: "Bespoke architectural design and luxury real estate for the extraordinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
