'use client'

import { apiClient } from "@/config/axios-client.config";


interface ClientInitializerProps{
    baseURL:string;
}


/**
 * @description Este un componente del lado del cliente que permite inicializar variables 
 * e instancias que se usan en toda la aplicación de forma monolítica
 * @returns <></> Un fragmento vacío
 */
export const ClientInitializer = ({ baseURL}:ClientInitializerProps) => {
    apiClient.setBaseURL = baseURL;
    return (
        <></>
    )
}
