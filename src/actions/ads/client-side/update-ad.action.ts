import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { UpdateAdFormPlainData } from "@/interfaces/ads/update-ad.interface";
import { AxiosResponse } from "axios";





const updateAd = async(adId:string, ad:UpdateAdFormPlainData, token:string) =>{
     let rs: AxiosResponse<boolean | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.patch(`ads/${adId}`,ad,
                {
                    headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                    }
    
                })
            return rs;
        } catch (e) {
            console.error(e)
            return e as AxiosResponse<GenericErrorResponse>;
        }
}



export {
    updateAd
}