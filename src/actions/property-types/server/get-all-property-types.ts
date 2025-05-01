'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { PropertyType } from "@/interfaces/property-types/property-type.interface";
import { AxiosResponse } from "axios";

export const getAllPropertyTypes = async():Promise<AxiosResponse< PropertyType[] | GenericErrorResponse>>=>{
    let rs: AxiosResponse< PropertyType[] | GenericErrorResponse>;
    try {
        rs = await api.get('property-types');
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}