'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { PropertyType } from "@/interfaces/property-types/property-type.interface";
import { AxiosResponse } from "axios";

export const getAllPropertyTypesFromClientSide = async():Promise<AxiosResponse< PropertyType[] | GenericErrorResponse>>=>{
    let rs: AxiosResponse< PropertyType[] | GenericErrorResponse>;
    try {
        rs = await apiClient.instance.get('property-types');
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}