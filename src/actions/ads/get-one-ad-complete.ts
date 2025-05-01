'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { AdWithUserId } from "@/interfaces/ads/ads.interface";
import { AxiosResponse } from "axios";

export const getOneAdComplete = async(id:string)=>{
    let rs: AxiosResponse<AdWithUserId | GenericErrorResponse>;
    try {
        rs = await api.get(`ads/complete/${id}`);
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}