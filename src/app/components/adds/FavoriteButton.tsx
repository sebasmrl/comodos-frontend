'use client';

import { Button } from '@/components/ui/button'
import { MdFavoriteBorder } from 'react-icons/md'

export const FavoriteButton = () => {
    return (
        <Button
            className="absolute top-2 sm:top-0 right-0 rounded-full  w-9 h-9 p-1"
            variant={"outline"}
            onClick={(e) => {
                e.stopPropagation();
        }}>
            <MdFavoriteBorder className="rounded-full text-rose-600 hover:bg-rose-600/20" />
        </Button>
    )
}
