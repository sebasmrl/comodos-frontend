//import { auth } from "@/auth";

//import { redirect } from "next/navigation";
import { NavBar } from "../components/navbar/NavBar";
import { getFavoriteAdsAction } from "@/actions/cookies/server/favorites/favorites.action";

import type { Metadata } from 'next'
import { FavoriteAdCard } from "../components/ads/FavoriteAdCard";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Lista de anuncios guardados como favoritos',
  authors: [{ name: 'Sebastian Morales', url: 'https://sebastianmorales.dev' }]
}


export default async function FavoritosPage() {
  //TODO: Activate later session blocked 
  //const session = await auth();
  //if (!(session?.user)) redirect('/');

  const favoriteAds = await getFavoriteAdsAction() ?? [];

  return (
    <div className="w-full min-h-dvh relative">
      <NavBar/>
      
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "dark:opacity-40",
          "h-[110%] w-full"
        )}
      />

      <div className="w-full flex justify-center p-2 gap-2 items-center pt-4">
        <h1 className="font-extralight text-2xl">Mis Favoritos</h1>
        <p className="text-xs font-semibold rounded-full bg-primary/20 min-w-5 min-h-5 text-center leading-relaxed">{favoriteAds.length}</p>
      </div>

      <div className="grid grid-cols-12 col-span-12 overflow-x-hidden px-4 sm:p-4 gap-y-3 gap-2 py-4 rounded-xl mb-10">
        {
          favoriteAds.length > 0 && favoriteAds.map(async (ad) => {
            return <FavoriteAdCard
              className="col-span-12 sm:mx-10 md:mx-0 md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8"
              key={ad.id}
              adData={ad}
            />
          })
        }
      </div>
     
    </div>
  );
}