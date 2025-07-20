import { getAllAdPeriods } from "@/actions/periods/server/get-all-ad-periods";
import { getAllPropertyTypes } from "@/actions/property-types/server/get-all-property-types";
import { CreateAdForm } from "@/app/components/ads/forms/CreateAdForm";
import { auth } from "@/auth";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AdPeriod } from "@/interfaces/ad-period/ad-period.interface";
import { PropertyType } from "@/interfaces/property-types/property-type.interface";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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

export default async function NuevoAnuncioPage() {

  const session = await auth();
  if (!session?.user) redirect('/auth/login')

  const queries = await Promise.all([getAllPropertyTypes(), getAllAdPeriods()]);
  const [propertyTypes, adPeriods] = queries;

  return (
    <div >
      <h1 className="text-4xl font-semibold tracking-tighter md:text-5xl  text-center py-2 sm:pt-6 px-10">
        Crea un nuevo<AuroraText className="px-2" colors={['#EA580C', '#F59E0B', '#E11D48']}>Anuncio</AuroraText>
      </h1>
      <CreateAdForm
        className=""
        propertyTypes={propertyTypes.status == 200 ? propertyTypes.data as PropertyType[] : []}
        adPeriods={adPeriods.status == 200 ? adPeriods.data as AdPeriod[] : []}
      />
    </div>
  );
}