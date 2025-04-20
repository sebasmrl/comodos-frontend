import { CreateAdForm } from "@/app/components/adds/forms/CreateAdForm";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comodos - Crear Nuevo Anuncio ",
  description: "Publica tu anuncio en la plataforma de comodos para encontrar tu arrendatario ideal",
  authors: {
    name: "Sebastian Morales",
    url: "https://sebastianmorales.dev"
  },
  keywords: ["arriendo", "arriendo en", "publicar arriendo", "arriendos baratos", "colombia", "alquiler", "alquilar", "arrendamiento", "inmuebles", "inmuebles para arrendamiento", "se arrienda"],
  applicationName: "Comodos",
  category: 'Arriendo',

};

export default function NuevoAnuncioPage() {
  return (
    <div >
      <h1 className="text-4xl font-semibold tracking-tighter md:text-5xl  text-center py-2 sm:pt-6 px-10">
        Crea un nuevo<AuroraText className="px-2" colors={['#EA580C','#F59E0B','#E11D48']}>Anuncio</AuroraText>
      </h1>
      <CreateAdForm className="" />
    </div>
  );
}