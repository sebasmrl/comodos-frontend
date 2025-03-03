'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { MainAddsRequestParams, MainAdsResponse } from "@/interfaces/adds/main-adds-response.interface";
import { AxiosResponse } from "axios";  

export const getMainAdds = async (params:MainAddsRequestParams)=>{
    const rs: AxiosResponse<MainAdsResponse | GenericErrorResponse> = await api.post(
            'adds/',
            params,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    return rs;
}
