'use client';

import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

interface Props{
    isFavorite?:boolean;
    disable?:boolean;
    onClick?: (isFavorite:boolean)=>void;
}

export const FavoriteButton = ({isFavorite=false, disable=false, onClick}:Props) => {

    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

    return (
        <Button
            className="absolute top-2 sm:top-0 right-0 rounded-full  w-9 h-9 p-1 hover:bg-rose-600/10 active:bg-rose-600/50"
            disabled = {disable}
            variant={"outline"}
            onClick={(e) => {
                e.stopPropagation();
                setIsFavoriteState( state=> !state)
                if(onClick) onClick(isFavoriteState);
        }}> 
            { isFavoriteState ? <MdFavorite className='rounded-full text-rose-600 hover:bg-rose-600/20'/> :<MdFavoriteBorder className="rounded-full text-rose-600 hover:bg-rose-600/20" />}
        </Button>
    )
}
