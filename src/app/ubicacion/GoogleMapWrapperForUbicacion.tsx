'use client';

import { useSession } from "next-auth/react";
import { GoogleMapV2 } from "../components/maps/GoogleMapV2";
import { useCurrentPosition } from "../components/maps/useCurrentPosition";

export const GoogleMapWrapperForUbicacion = () => {

    const session = useSession();
    const {location}= useCurrentPosition({autorefresh:false});
    

    return (
        <>
            <GoogleMapV2
                className="h-full p-0"
                classNameInputDiv="relative p-0"
                classNameInput="absolute top-20 bg-background w-[80%] right-[10%] xl:w-[50%] xl:right-[25%]"
                classNameMap="h-full"
                initialZoom={ session.status == 'authenticated' ? 15 : 7}
                initialCoords={ session.status == 'authenticated' ? session.data.user.data.coords : location}
            />
        </>
    )
}
