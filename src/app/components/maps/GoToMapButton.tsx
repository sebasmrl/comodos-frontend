'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { TfiMapAlt } from "react-icons/tfi";

interface Props{
    className?: string;
    iconClassName?: string;
}

export const GoToMapButton = ({className, iconClassName}:Props) => {
    const router = useRouter();
    return (
        <Button
            className={cn("w-full", className)}
            variant={'default'}
            onClick={() => {
                router.push('/ubicacion');
            }} ><TfiMapAlt className={cn("", iconClassName)}/>Ir al mapa </Button>
    )
}
