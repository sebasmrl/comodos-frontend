'use client'

import { setCompleteCookieFilterAdsProp } from "@/actions/cookies/client/filter/filter";
import { getFilterAdsFromLocalStorage } from "@/actions/local-storage/filter-local-storage.action";
import { apiClient } from "@/config/axios-client.config";
import { usePeriodsStore } from "@/store/periods.store copy";
import { usePropertyTypesStore } from "@/store/property-types.store";
import { useLayoutEffect } from "react";


interface ClientInitializerProps {
    baseURL: string;
}


/**
 * @description Este un componente del lado del cliente que permite inicializar variables 
 * e instancias que se usan en toda la aplicación de forma monolítica
 * @returns <></> Un fragmento vacío
 */
export const ClientInitializer = ({ baseURL }: ClientInitializerProps) => {
    apiClient.setBaseURL = baseURL;

    const { fetchPropertyTypes } = usePropertyTypesStore();
    const { fetchPeriods } = usePeriodsStore();
    
    const filters = getFilterAdsFromLocalStorage();
    setCompleteCookieFilterAdsProp(filters);

    useLayoutEffect(() => {
        fetchPropertyTypes();
        fetchPeriods();
    }, [fetchPropertyTypes, fetchPeriods]);
    
    return (
        <></>
    )
}
