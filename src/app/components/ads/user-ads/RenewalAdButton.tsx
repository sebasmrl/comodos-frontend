'use client';

import { renewevalAd } from "@/actions/ads/client-side/renewal-ad.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdAutorenew } from "react-icons/md";


interface Props {
    adId: string;
}
export const RenewalAdButton = ({ adId }: Props) => {
    const router = useRouter();
    const session = useSession();
    if (!session) return <MdAutorenew className="w-full" />
    

    return (
        <MdAutorenew className="w-full" onClick={async () => {
            try {
                const rs = await renewevalAd({ adId, token: session.data?.user.data.backendTokens.accessToken as string });
                if(rs.data == true) router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
            }
        }} />
    )
}
