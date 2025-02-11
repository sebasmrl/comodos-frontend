'use server';

import { api } from "@/config/axios.config";
import { AuthResponse, GenericErrorResponse } from "@/interfaces";
import { AxiosResponse } from "axios";

export const refreshTokenAction = async (refreshToken: string): Promise<AxiosResponse<AuthResponse | GenericErrorResponse>> => {
    const rs: AxiosResponse<AuthResponse | GenericErrorResponse> = await api.post(
        'auth/refresh',
        {},
        {
            headers: { 'Authorization': `Refresh ${refreshToken}` }
        }
    );
    return rs;
}




//con Fetch
/*  if (rs.status == 401) return rs.data as GenericErrorResponse;
     const data = (rs.data as AuthResponse)
     return {
         ...data.user,
         backendTokens: {
             accessToken: data.accessToken,
             refreshToken: data.refreshToken
         }
     } */