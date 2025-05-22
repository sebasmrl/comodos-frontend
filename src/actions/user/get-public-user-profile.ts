'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { PublicUserProfile } from "@/interfaces/user/public-user-profile.interface";
import { AxiosResponse } from "axios";

export const getPublicUserProfileById = async(id:string)=>{
    let rs: AxiosResponse<PublicUserProfile | GenericErrorResponse>;
    try {
        rs = await api.get(`/users/public-profile/${id}`);
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}