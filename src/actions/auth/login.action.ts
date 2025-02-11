'use server'

import { api } from "@/config/axios.config";
import {
    GenericErrorResponse,
    LoginParams,
    AuthResponse
} from "@/interfaces";
import { AxiosResponse } from "axios";

export const loginAction = async (credentials: LoginParams): Promise<AxiosResponse<AuthResponse | GenericErrorResponse>> => 
{
    const rs: AxiosResponse<AuthResponse | GenericErrorResponse> = await api.post(
        'auth/login',
        credentials,
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
    return rs;
}










/* //con Fetch

export const loginAction = async (credentials:LoginParams): Promise<AuthorizeUser | GenericErrorResponse> => 
{
    console.log('Entro a login')
    const res:AuthResponse | GenericErrorResponse = await fetch( 'http://localhost:3001/api/auth/login', {
        body: JSON.stringify(credentials),
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res =>res.json());
    console.log({ServerRes:res})
    if ((res as GenericErrorResponse).statusCode >= 400 ){
        return res as GenericErrorResponse;
    } else {
        const { accessToken, refreshToken, user } = res as AuthResponse;
        return { ...user, backendTokens: { accessToken, refreshToken } }
    }
}
*/