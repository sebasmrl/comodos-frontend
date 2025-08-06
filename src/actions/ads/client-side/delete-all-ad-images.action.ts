'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import {  AxiosError, AxiosResponse } from "axios";



interface DeleteAllAdImagesParams{
    adId:string;
    token: string;
}

const deleteAllAdImages = async({adId,  token}:DeleteAllAdImagesParams) =>{
     let rs: AxiosResponse<boolean | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.delete(`ad-images/ad/${adId}`,
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
    deleteAllAdImages
}