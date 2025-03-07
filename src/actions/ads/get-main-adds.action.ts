'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { MainAd, MainAddsRequestParams} from "@/interfaces/adds/main-adds.interface";
import { AxiosResponse } from "axios";  

export const getMainAdds = async (params:MainAddsRequestParams)=>{
    //console.log(`adds${Object.values(params).length != 0 ? '?':''}${Object.entries(params).filter( v=> v[1] !=undefined).map( v=> `${v[0]}=${v[1]}`).join('&')}`)
    const rs: AxiosResponse<MainAd[] | GenericErrorResponse> = await api.get(
        `adds${Object.values(params).length != 0 ? '?':''}${Object.entries(params).filter( v=> v[1] !=undefined).map( v=> `${v[0]}=${v[1]}`).join('&')}`
    );
    return rs;
} 
