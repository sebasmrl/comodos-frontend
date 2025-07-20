import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { CreateAdFormPlainData } from "@/interfaces/ads/create-ad.interface";
import { AxiosResponse } from "axios";





const createAd = async(ad:CreateAdFormPlainData,  token:string) =>{
     let rs: AxiosResponse<boolean | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.post(`ads`,ad,
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
    createAd
}