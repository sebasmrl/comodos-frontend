import { getOneAdComplete } from "@/actions/ads/get-one-ad-complete";
import { Card, CardContent } from "@/components/ui/card";
import { AdWithUser } from "@/interfaces/ads/ads.interface";
import { redirect } from "next/navigation";
import { ClientPhotoView } from "./ClientPhotoView";
import { CiMapPin } from "react-icons/ci";
import { FavoriteAdButton } from "@/app/components/ads/FavoriteAdButton";
import Link from "next/link";
import Image from "next/image";
import { toUpperCamelCase } from "@/lib/custom/string";

const CLOUDFRONT_URL = process.env.AWS_CLOUDFRONT_DOMAIN ?? '';

export default async function AnuncioPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;
    const adRs = await getOneAdComplete(id);
    if (adRs.status != 200) redirect('/');

    const ad = adRs.data as AdWithUser;

    return (
        <div className="px-4 py-8 w-full">
            <Card className="flex w-full shadow-none p-0 border-none">
                <CardContent className="grid grid-cols-12 p-2 rounded-lg gap-6  w-full">
                    <section className="relative col-span-12 lg:col-span-8 flex flex-col  rounded-lg p-0 m-0 gap-2">
                        <ClientPhotoView
                            className="rounded-lg overflow-hidden"
                            domainimages={CLOUDFRONT_URL} ad={ad}
                        />
                        <FavoriteAdButton className="bg-transparent border-none shadow-none right-2 sm:top-2" id={ad.id} />
                        <div className="">
                            <h1 className="font-bold text-xl sm:text-2xl text-wrap">{ad.name}</h1>
                            <div className="flex items-center hover:rounded-md text-foreground px-1">
                                <CiMapPin />
                                <p className="px-1 text-sm md:text-lg font-light text-gray-700 dark:text-inherit text-wrap">{ad.address}, <span>{ad.locationCity}</span></p>
                            </div>
                        </div>
                        <div className="flex">
                            <Link href={`/usuarios/publico/${ad.user.id}`}>
                                <div className="flex items-center hover:rounded-md hover:bg-primary/5 p-2 px-4  shadow-sm rounded-md m-1 gap-2" >
                                    <div className="overflow-hidden aspect-square w-12 h-12 max-w-20 max-h-20 rounded-full">
                                        <Image width={35} height={35} src={`${CLOUDFRONT_URL}/${ad.user.profileImage.key}`} alt="Imagen de perfil" className="mr-2 rounded-full h-full w-full  object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 "><span>{toUpperCamelCase(`${ad.user.names.split(' ')[0]} ${ad.user.lastnames.split(' ')[0]}`)}</span></p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Arrendador</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>
                    <section className="col-span-12 lg:col-span-4 flex flex-col border border-border rounded-lg ">
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
