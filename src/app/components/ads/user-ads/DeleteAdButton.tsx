'use client';

import { deleteAd } from "@/actions/ads/client-side/delete-ad.action";
import { deleteAllAdImages } from "@/actions/ads/client-side/delete-all-ad-images.action";
import { Button } from "@/components/ui/button";
import { GenericErrorResponse } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { customSonnerToast } from "../../custom-sonner-toast/customSonnerToast";


interface Props {
    adId: string;
}
export const DeleteAdButton = ({ adId }: Props) => {
    const router = useRouter();
    const session = useSession();



    return (
        <Button
            className="inline-flex items-center gap-2 p-2"
            variant={'destructive'}
            disabled={session ? false : true}
            onClick={async () => {
                console.log('le di click a eliminar')
                let adWasDeleted: boolean = false;

                const adImagesWasDeleted = await deleteAllAdImages({ adId, token: session.data?.user.data.backendTokens.accessToken as string });

                if (adImagesWasDeleted?.status >= 200 && adImagesWasDeleted?.status < 300) {

                    const adDeleted = await deleteAd({ adId, token: session.data?.user.data.backendTokens.accessToken as string });
                    if (adDeleted?.status >= 200 && adDeleted?.status < 300) {
                        adWasDeleted = (adDeleted.data as boolean);
                        customSonnerToast({
                            title: `El anuncio se ha eliminado`,
                            variant: 'success',
                            duration: 4000,
                            description: `El anuncio con ${adId} se ha eliminado `
                        })
                    } else {
                        const errorMessage = (adDeleted.data as GenericErrorResponse).message;
                        customSonnerToast({
                            title: 'Upps!! No se pudo eliminar el anuncio',
                            variant: 'destructive',
                            duration: 4000,
                            description: `${(typeof errorMessage === 'string') ? errorMessage : (errorMessage as string[]).join('\n')}`
                        });
                    }

                } else {
                    const errorMessage = (adImagesWasDeleted.data as GenericErrorResponse).message;
                    customSonnerToast({
                        title: 'Upps!! No se pudo eliminar el anuncio',
                        variant: 'destructive',
                        duration: 4000,
                        description: `${(typeof errorMessage === 'string') ? errorMessage : (errorMessage as string[]).join('\n')}`
                    });

                }

                if (adWasDeleted) return router.refresh();

            }}

        >
            <MdDelete /> <p>Eliminar</p>
        </Button>
    )
}