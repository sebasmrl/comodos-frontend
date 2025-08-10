import { GenericErrorResponse } from "@/interfaces";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/config/axios.config";
import { Ad } from "@/interfaces/ads/ads.interface";


export const getAdsByUserId = async (userId:string) =>{
    let rs: AxiosResponse< Ad[] | GenericErrorResponse>;
        try {
            rs = await api.get(`ads/user/${userId}`);
            return rs;
        } catch (e) {
            return (e as AxiosError).response as AxiosResponse<GenericErrorResponse>
        }
}