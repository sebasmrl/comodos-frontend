'use client';

//import { api } from "@/config/axios.config";
import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse, RegisterUserRequestBody, RegistratedUserResponse } from "@/interfaces";
import { AxiosError, AxiosResponse } from "axios";

export const registerUserClientAction = async (body: RegisterUserRequestBody) => {

    try {
        const rs: AxiosResponse<RegistratedUserResponse | GenericErrorResponse> = await apiClient.instance.post(
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