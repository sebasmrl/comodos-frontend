'use client';

import { useSession } from "next-auth/react";
import { GoogleMapV2 } from "../components/maps/GoogleMapV2";
import { useCurrentPosition } from "../../hooks/custom/useCurrentPosition";
import { useRouter } from "next/navigation";
import { customSonnerToast } from "../components/custom-sonner-toast/customSonnerToast";

export const GoogleMapWrapperForUbicacion = () => {

    const session = useSession();
    const { location } = useCurrentPosition({ autorefresh: false });
    const router = useRouter();

    return (
        <>
            <GoogleMapV2
                className="h-full p-0"
                classNameInputDiv="relative p-0"
                classNameInput="absolute top-20 bg-background w-[80%] right-[10%] xl:w-[50%] xl:right-[25%]"
                classNameMap="h-full"
                initialZoom={session.status == 'authenticated' ? 17 : 16}
                initialCoords={session.status == 'authenticated' ? session.data.user.data.coords : location}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                getCoordsSelectedCallback={async (coords) => {
                    //TODO: Save coordinates in the database
                    router.replace('/')
                    customSonnerToast({
                        title: 'Nueva Ubicación Seleccionada',
                        variant: 'success',
                        duration: 2800,
                        description: 'Ahora te apareceran anuncios cerca de la ubicacion que seleccionaste'
                    })
                }}
            />
        </>
    )
}
