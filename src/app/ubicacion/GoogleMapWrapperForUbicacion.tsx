'use client';

import { useSession } from "next-auth/react";
import { GoogleMapV2 } from "../components/maps/GoogleMapV2";
import { useCurrentPosition } from "../../hooks/custom/useCurrentPosition";
import { useRouter } from "next/navigation";
import { customSonnerToast } from "../components/custom-sonner-toast/customSonnerToast";
import { getCookieFilterAds, setCookieFilterAdsProp } from "@/actions/cookies/client/filter/filter";
import { updateUser } from "@/actions/user/client-side/update-user.action";

export const GoogleMapWrapperForUbicacion = () => {

    const session = useSession();
    const { location } = useCurrentPosition({ autorefresh: false });
    const router = useRouter();
    const { lat, lng} = getCookieFilterAds();

    return (
        <>
            <GoogleMapV2
                className="h-full p-0"
                classNameInputDiv="relative p-0"
                classNameInput="absolute top-20 bg-background w-[80%] right-[10%] xl:w-[50%] xl:right-[25%]"
                classNameMap="h-full"
                initialZoom={session.status == 'authenticated' ? 17 : 16}
                initialCoords={( session?.data?.user?.data?.coords) ? session.data.user.data.coords : (lat && lng) ? { lat: Number(lat), lng:Number(lng)} : location}
                getCoordsSelectedCallback={async (coords) => {

                    setCookieFilterAdsProp({...coords})
                    if(session.data?.user){
                        const userWasUpdated = await  updateUser({ 
                            data:{ coords}, 
                            token:session.data.user.data.backendTokens.accessToken
                        });

                        if (userWasUpdated?.status >= 200 && userWasUpdated?.status < 300) { 
                            customSonnerToast({
                                title: 'Nueva ubicación guardada y seleccionada',
                                variant: 'success',
                                duration: 3000,
                                description: 'Ahora te apareceran anuncios cerca de la ubicacion que seleccionaste'
                            })
                        }else{
                            customSonnerToast({
                                title: 'Nueva ubicación seleccionada',
                                variant: 'success',
                                duration: 3000,
                                description: 'Ahora te apareceran anuncios cerca de la ubicacion que seleccionaste'
                            });
                        }

                    }else{
                        customSonnerToast({
                            title: 'Nueva ubicación seleccionada',
                            variant: 'success',
                            duration: 3000,
                            description: 'Ahora te apareceran anuncios cerca de la ubicacion que seleccionaste'
                        })
                    }

                    router.replace('/')
                }}
            />
        </>
    )
}
