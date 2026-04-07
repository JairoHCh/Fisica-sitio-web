import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNI Physics Lab",
  description: "Simulador de física para ingeniería",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        <Navbar />
        {/* El main ocupará el resto del espacio debajo del Nav */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}