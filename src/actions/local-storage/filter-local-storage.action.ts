'use client';

import { SearchParams } from "@/interfaces/search-params.type";


export const getFilterAdsFromLocalStorage = ():SearchParams=>{
    const value = localStorage.getItem('filter-ads');
    const valueParse = JSON.parse(value ?? '{}' );
    return valueParse;
}

export const setFilterAdsInLocalStorage = (filterAds:SearchParams)=>{
    localStorage.setItem('filter-ads', JSON.stringify(filterAds))
    return;
}