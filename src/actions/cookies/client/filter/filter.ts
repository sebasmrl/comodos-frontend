'use client';


import { SearchParams } from "@/interfaces/search-params.type";
import { getCookie, hasCookie, setCookie } from "cookies-next";


export const getCookieFilterAds = ():SearchParams =>{
    if(hasCookie('filter-ads')){
        const cookieFavoriteAds = JSON.parse(getCookie('filter-ads') as string ?? '{}');
        return cookieFavoriteAds;
    }
    return {};  
}

export const setCookieFilterAdsProp = (params:SearchParams)=>{
    const filterAds = getCookieFilterAds();   
    const newFilter = {...filterAds, ...params}
    setCookie('filter-ads', newFilter);
    return newFilter;
}
export const setCompleteCookieFilterAdsProp = (params:SearchParams)=>{
    setCookie('filter-ads', params);
    return params;
}