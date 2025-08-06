'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import {  AxiosError, AxiosResponse } from "axios";


interface DeleteAdParams{
    adId:string;
    token: string;
}

const deleteAd = async({adId,  token}:DeleteAdParams) =>{
     let rs: AxiosResponse<boolean | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.delete(`ads/${adId}`,
                {
                    headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                    }
    
                })
            return rs
        } catch (e) {
            return (e as AxiosError).response as AxiosResponse<GenericErrorResponse>
        }
}


export {
    deleteAd
}