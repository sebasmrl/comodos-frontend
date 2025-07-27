'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse, RegisterUserRequestBody, RegistratedUserResponse } from "@/interfaces";
import { AxiosError, AxiosResponse } from "axios";

export const registerAction = async (body: RegisterUserRequestBody) => {

    try {
        const rs: AxiosResponse<RegistratedUserResponse | GenericErrorResponse> = await api.post(
            'auth/registry',
            body,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return rs;
    } catch (e) {
        return (e as AxiosError).response as AxiosResponse<GenericErrorResponse>;
    }
}