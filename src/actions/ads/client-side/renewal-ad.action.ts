'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { AxiosResponse } from "axios";


interface Args {
    adId: string;
    token: string;
}

const renewevalAd = async ({ adId, token }: Args) => {
    let rs: AxiosResponse<boolean | GenericErrorResponse>;
    try {
        rs = await apiClient.instance.patch(`ads/renewal/${adId}`,{},
            {
                headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                }

            })
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}




export {
    renewevalAd
}