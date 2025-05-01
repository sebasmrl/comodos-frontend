import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, ThemeProvider } from "@/providers";
import { ClientInitializer } from "./components/client-initializer/ClientInitializer";


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
  applicationName: "Comodos",
  category: 'Arriendo',

};

const baseURL = `${process.env.BACKEND_DOMAIN}/api`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background `}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          /* defaultTheme="" */
          /* disableTransitionOnChange */
        >
          <AuthProvider>
              {children}
              <ClientInitializer baseURL={baseURL}/>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
        < SonnerToaster />
      </body>
    </html>
  );
}
