
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAdsByUserId } from "@/actions/ads/get-ads-by-userid";

import { AuroraText } from "@/components/magicui/aurora-text";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAdCardItemsContainer } from "../components/ads/user-ads/UserAdCardItemsContainer";
import { UserAdCardItem } from "../components/ads/user-ads/UserAdCardItem";
import { Ad } from "@/interfaces/ads/ads.interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import EmptyAdsContainer from "../components/ads/EmptyAdsContainer";


const AWS_CLOUDFRONT_DOMAIN = process.env.AWS_CLOUDFRONT_DOMAIN ?? null;


export const metadata: Metadata = {
  title: 'Comodos - Mis Anuncios',
  description: 'Gestiona tus anuncios',
  authors: [{ name: 'Sebastian Morales', url: 'https://sebastianmorales.dev' }]
}

//ver listado de anuncios de una

export default async function AnunciosPage() {

  const session = await auth();
  if (!(session?.user)) redirect('/auth/login');

  const ads = (await getAdsByUserId(session.user.data.id ?? '')).data as Ad[];

  return (
    <div className="grid grid-cols-12 gap-2 px-2 md:px-6 pt-4">

      <div className="col-span-12 md:col-span-8 flex flex-col">
        <div className="flex justify-between items-center px-2 pl-6">
          <h1 className="text-3xl font-semibold tracking-tighter md:text-4xl  text-start py-2 ">
            Mis<AuroraText className="pl-2" colors={['#EA580C', '#F59E0B', '#E11D48']}>Anuncios</AuroraText>
          </h1>
          {
            ads.length > 0 && 
            <Link href={'/anuncios/nuevo'} className="">
              <Button variant={"success"} className=""><IoIosAddCircle />Agregar</Button>
            </Link>
          }
        </div>

        {
          ads.length > 0 ?
            <UserAdCardItemsContainer className="col-span-12 grid grid-cols-12 gap-4 p-2 border-none md:pb-10">
              {
                ads.map(ad => (
                  <UserAdCardItem key={ad.id} ad={ad} className="col-span-12" baseUrl={AWS_CLOUDFRONT_DOMAIN} />
                ))
              }
            </UserAdCardItemsContainer >
            : <div className="col-span-12 p-2 gap-4">
              <EmptyAdsContainer />
            </div>

        }
      </div>


      <section className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-2 py-2 px-2 items-start pb-10 sm:pb-0">
        <p className="text-accent-foreground text-center font-thin text-3xl w-full">Resumen</p>
        <Card className="col-span-3 bg-rose-300/60 dark:bg-rose-300/90  text-rose-700 border border-rose-500/70">
          <CardHeader className="inline-grid grid-cols-6 items-center justify-center min-h-full">
            <p className="col-span-1 row-span-2 text-3xl text-center font-bold">{ads.length}</p>
            <CardTitle className="col-span-5">Anuncios publicados</CardTitle>
            <CardDescription className="col-span-5 text-rose-700/90 text-pretty">Publica un nuevo anuncio y consigue alquilar tu inmueble.</CardDescription>
          </CardHeader>
        </Card>
        <Card className=" bg-emerald-300/60 dark:bg-emerald-300/90  text-emerald-700 border border-emerald-500/70">
          <CardHeader className="inline-grid grid-cols-6 items-center justify-center ">
            <p className="col-span-1 row-span-2 text-3xl text-center font-bold">{ads.filter(ad => new Date(ad.expiredDate).getTime() > Date.now()).length}</p>
            <CardTitle className="col-span-5">Anuncio(s) vigente(s)</CardTitle>
            <CardDescription className="col-span-5 text-emerald-700 text-pretty">Son los que las personas pueden ver al buscar inmuebles cerca de su ubicación.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-blue-300/60 dark:bg-blue-300/90  text-blue-700 border border-blue-500/70 ">
          <CardHeader className="inline-grid grid-cols-6 items-center justify-center gap-x-2 ">
            <p className="col-span-1 row-span-2 text-3xl text-center font-bold">{ads.filter(ad => new Date(ad.expiredDate).getTime() < Date.now()).length}</p>
            <CardTitle className="col-span-5 ">Anuncio(s) caducados</CardTitle>
            <CardDescription className="col-span-5 text-blue-700 text-pretty">Debes adquirir una suscripción para habilitar tus anuncios caducados y así las personas puedan encontrar tu inmueble.</CardDescription>
          </CardHeader>
        </Card>
      </section>


    </div>
  );
}




{/* <section className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-2 py-2 pr-2 items-start">
        <p className="text-accent-foreground text-center font-thin text-3xl w-full">Resumen</p>
        <Card className="col-span-3 bg-gradient-to-r from-rose-700 to-orange-500  text-white">
          <CardHeader className="inline-grid grid-cols-6 items-center justify-center min-h-full">
            <p className="col-span-1 row-span-2 text-2xl text-center font-bold">{ads.length}</p>
            <CardTitle className="col-span-5">Anuncios publicados</CardTitle>
            <CardDescription className="col-span-5 text-slate-200 text-pretty">Publica un nuevo anuncio y consigue alquilar tu inmueble.</CardDescription>
          </CardHeader>
        </Card>
        <Card className=" bg-gradient-to-r from-green-700 to-emerald-600 text-white">
          <CardHeader className="inline-grid grid-cols-6 items-center justify-center ">
            <p className="col-span-1 row-span-2 text-2xl text-center font-bold">{ads.filter(ad=> new Date(ad.expiredDate).getTime() > Date.now()).length}</p>
            <CardTitle className="col-span-5">Anuncio(s) vigente(s)</CardTitle>
            <CardDescription className="col-span-5 text-slate-200 text-pretty">Son los que las personas pueden ver al buscar inmuebles cerca de su ubicación.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gradient-to-r from-sky-500  to-blue-800 text-white ">
          <CardHeader className="inline-grid grid-cols-6 items-center justify-center gap-x-2 ">
            <p className="col-span-1 row-span-2 text-2xl text-center font-bold">{ads.filter(ad=> new Date(ad.expiredDate).getTime() < Date.now()).length}</p>
            <CardTitle className="col-span-5 ">Anuncio(s) caducados</CardTitle>
            <CardDescription className="col-span-5 text-slate-200 text-pretty">Debes adquirir una suscripción para habilitar tus anuncios caducados y así las personas puedan encontrar tu inmueble.</CardDescription>
          </CardHeader>
        </Card>
      </section> */}