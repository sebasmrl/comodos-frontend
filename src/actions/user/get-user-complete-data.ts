'use server';

import { auth } from "@/auth";
import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface";
import { AxiosResponse } from "axios";

export const getUserCompleteData = async(id:string)=>{
    const session = await auth();
     let rs: AxiosResponse<CompleteUserProfile | GenericErrorResponse>;
        try {
            rs = await api.get(`/users/${id}`,{ 
                headers:{ 
                    "Content-Type":'application/json', 
                    "Authorization":`Bearer ${session?.user.data.backendTokens.accessToken}`
                }
            });
            return rs;
        } catch (e) {
            return e as AxiosResponse<GenericErrorResponse>;
        }
}