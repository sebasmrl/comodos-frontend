'use client';

//import { useSession } from "next-auth/react";
import { FavoriteButton } from "../favorite-button/FavoriteButton"
import { addToFavoritesAd, deleteOneFavoriteAd, isPresentIdInFavorites } from "@/actions/cookies/client/favorites/favorites.action";
import { usePathname, useRouter } from "next/navigation";

interface Props extends React.HTMLProps<HTMLElement>{
    id:string;
}

export const FavoriteAdButton = ({id, className}:Props) => {

    //TODO: Activate later session blocked 
    //const session = useSession();
    const router =  useRouter();
    const path = usePathname();
    const isFavorite = isPresentIdInFavorites(id);
    

  return (
    <FavoriteButton className={className} isFavorite={isFavorite} /* disable={session.status != 'authenticated'} */ onCustomClick={(isFavorite)=>{
        console.log(path)
        if(isFavorite){ 
            deleteOneFavoriteAd(id) 
        }else{
            addToFavoritesAd(id)
        }
        if(path == '/favoritos') router.refresh();
    }}/>
  )
}
