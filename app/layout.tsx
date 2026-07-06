import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";
import BackgroundParticles from "@/components/background-particles";

export const metadata: Metadata = {
  title: "Quatro Estilos",
  description: "Agende seu corte",
  icons: {
    icon: "/images/Logo.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased min-h-screen relative">
        <ThemeProvider>
          <BackgroundParticles />
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}