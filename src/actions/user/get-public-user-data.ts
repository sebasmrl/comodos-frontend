'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { PublicUserData } from "@/interfaces/user/public-user-profile.interface";
import { AxiosResponse } from "axios";

export const getPublicUserDataById = async(id:string)=>{
    let rs: AxiosResponse<PublicUserData | GenericErrorResponse>;
    try {
        rs = await api.get(`/users/public-data/${id}`);
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}