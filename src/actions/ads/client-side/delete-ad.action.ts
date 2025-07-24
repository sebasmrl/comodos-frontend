import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import {  AxiosError, AxiosResponse } from "axios";


const deleteAd = async(adId:string,  token:string) =>{
     let rs: AxiosResponse<boolean | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.delete(`ads/:${adId}`,
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