'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse, RegisterUserRequestBody, RegistratedUserResponse } from "@/interfaces";
import { AxiosResponse } from "axios";

export const registerAction = async (body:RegisterUserRequestBody)=>{
     const rs: AxiosResponse<RegistratedUserResponse | GenericErrorResponse> = await api.post(
            'auth/registry',
            body,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return rs;
}