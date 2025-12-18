import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Power | Expertos en Currículum y LinkedIn",
  description: "Aumenta tus entrevistas laborales con un CV optimizado para ATS. Servicios profesionales de redacción de perfil y búsqueda de empleo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased bg-brand-light text-brand-dark`}
      >
        {children}
      </body>
    </html>
  );
}
