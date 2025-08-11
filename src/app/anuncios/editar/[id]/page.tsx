import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { AuroraText } from "@/components/magicui/aurora-text";

import { getOneAdComplete } from "@/actions/ads/get-one-ad-complete";
import { EditAdForm } from "@/app/components/ads/forms/EditAdForm";
import { AdWithUser } from "@/interfaces/ads/ads.interface";
import { getAllPropertyTypes } from "@/actions/property-types/server/get-all-property-types";
import { PropertyType } from "@/interfaces/property-types/property-type.interface";
import { getAllAdPeriods } from "@/actions/periods/server/get-all-ad-periods";
import { AdPeriod } from "@/interfaces/ad-period/ad-period.interface";
import { Footer } from "@/app/components/footer/Footer";

export const metadata: Metadata = {
    title: "Comodos - Editar Anuncio ",
    description: "Edita el anuncio que publicaste y saca el mejor provecho",
    authors: {
        name: "Sebastian Morales",
        url: "https://sebastianmorales.dev"
    },
    keywords: ["arriendo", "arriendo en", "apartaemento", "editar arriendo", "arriendos baratos", "colombia", "alquiler", "alquilar", "arrendamiento", "inmuebles", "inmuebles para arrendamiento", "se arrienda"],
    applicationName: "Comodos",
    category: 'Arriendo',

};

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ id: string }>
}

export default async function EditPage({ params }: Props) {


    const session = await auth();
    if (!(session?.user)) redirect('/auth/login');

    const adData = await getOneAdComplete((await params).id);
    if (adData.status != 200) redirect('/') // '/anuncios'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...defaultData } = adData.data as AdWithUser;

    const queries = await Promise.all([getAllPropertyTypes(), getAllAdPeriods()]);
    const [propertyTypes, adPeriods] = queries;

    const AWS_CLOUDFRONT_DOMAIN = process.env.AWS_CLOUDFRONT_DOMAIN ?? null;

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold tracking-tighter md:text-5xl  text-center py-2 sm:pt-6 px-10">
                    Edita tu<AuroraText className="px-2" colors={['#EA580C', '#F59E0B', '#E11D48']}>Anuncio</AuroraText>
                </h1>
                <EditAdForm
                    propertyTypes={propertyTypes.status == 200 ? propertyTypes.data as PropertyType[] : []}
                    adPeriods={adPeriods.status == 200 ? adPeriods.data as AdPeriod[] : []}
                    defaultData={defaultData}
                    imagesServerDomain={AWS_CLOUDFRONT_DOMAIN}
                />
            </div>
            <Footer className="col-span-12"/>
        </>
    );
}