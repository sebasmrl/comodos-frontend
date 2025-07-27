'use client';

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

interface Props extends React.HTMLProps<HTMLButtonElement>{
    isFavorite?:boolean;
    disable?:boolean;
    onCustomClick?: (isFavorite:boolean)=>void;
}

export const FavoriteButton = ({ className, isFavorite=false, disable=false, onCustomClick}:Props) => {

    const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

    return (
        <Button
            className={cn(" rounded-full  w-9 h-9 p-1 flex justify-center items-center hover:bg-rose-600/10 active:bg-rose-600/50", className)}
            disabled = {disable}
            variant={"outline"}
            onClick={(e) => {
                e.stopPropagation();
                setIsFavoriteState( state=> !state)
                if(onCustomClick) onCustomClick(isFavoriteState);
        }}> 
            { isFavoriteState ? <MdFavorite className='rounded-full text-rose-600 hover:bg-rose-600/20 w-full'/> :<MdFavoriteBorder className="w-full rounded-full text-rose-600 hover:bg-rose-600/20" />}
        </Button>
    )
}
