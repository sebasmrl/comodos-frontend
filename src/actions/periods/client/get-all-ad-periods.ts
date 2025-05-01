'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { AdPeriod } from "@/interfaces/ad-period/ad-period.interface";
import { AxiosResponse } from "axios";

export const getAllAdPeriodsFromClientSide = async():Promise<AxiosResponse< AdPeriod[] | GenericErrorResponse>>=>{
    let rs: AxiosResponse< AdPeriod[] | GenericErrorResponse>;
    try {
        rs = await apiClient.instance.get('ad-periods');
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}