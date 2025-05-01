'use server';

import { api } from "@/config/axios.config";
import { GenericErrorResponse } from "@/interfaces";
import { AdPeriod } from "@/interfaces/ad-period/ad-period.interface";
import { AxiosResponse } from "axios";

export const getAllAdPeriods = async():Promise<AxiosResponse< AdPeriod[] | GenericErrorResponse>>=>{
    let rs: AxiosResponse< AdPeriod[] | GenericErrorResponse>;
    try {
        rs = await api.get('ad-periods');
        return rs;
    } catch (e) {
        return e as AxiosResponse<GenericErrorResponse>;
    }
}