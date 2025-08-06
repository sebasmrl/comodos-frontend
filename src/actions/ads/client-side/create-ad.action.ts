'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { CreateAdFormPlainData, CreateAdResponse } from "@/interfaces/ads/create-ad.interface";
import {  AxiosError, AxiosResponse } from "axios";





const createAd = async(ad:CreateAdFormPlainData,  token:string) =>{
     let rs: AxiosResponse<CreateAdResponse | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.post(`ads`,ad,
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
    createAd
}