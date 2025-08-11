import { GenericErrorResponse } from "@/interfaces";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "@/config/axios.config";
import { Coords } from "@/interfaces/coords.interface";


export const getUserCoordsAction = async (token:string) =>{
    let rs: AxiosResponse< Coords | GenericErrorResponse>;
        try {
            rs = await api.get(`users/coords`, {
                headers:{
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`
                }
            });
            return rs;
        } catch (e) {
            return (e as AxiosError).response as AxiosResponse<GenericErrorResponse>
        }
}