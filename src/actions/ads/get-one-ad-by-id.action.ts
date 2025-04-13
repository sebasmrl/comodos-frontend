'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { MainAd } from "@/interfaces/adds/main-adds.interface";
import { AxiosResponse } from "axios";

export const getOneAdById = async(id:string)=>{
    let rs: AxiosResponse<MainAd | GenericErrorResponse>;
    try {
        rs = await api.get(`adds/${id}`);
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}