'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { Ad } from "@/interfaces/adds";
import { AxiosResponse } from "axios";

export const getOneAdById = async(id:string)=>{
    let rs: AxiosResponse<Ad | GenericErrorResponse>;
    try {
        rs = await api.get(`ads/${id}`);
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}