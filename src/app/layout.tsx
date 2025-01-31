import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comodos - Encuentra Arriendo Fácil ",
  description: "Encuentra arriendo o publica tu inmueble fácil y rapido, solo selecciona una ubicación y elige el mejor inmueble para ti",
  authors: { 
    name: "Sebastian Morales",
    url: "https://sebastianmorales.dev"
  },
  keywords: ["arriendo", "arriendo en", "publicar arriendo", "arriendos baratos", "colombia", "alquiler", "alquilar", "arrendamiento", "inmuebles", "inmuebles para arrendamiento", "se arrienda"],
  applicationName:"Comodos",
  category:'Arriendo'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
