'use server';
import { AxiosResponse } from 'axios';

import { getOneAdById } from '@/actions/ads/get-one-ad-by-id.action';
import { MainAd } from '@/interfaces/adds/main-adds.interface';
import { cookies } from 'next/headers';


export const getFavoriteAdsAction = async( ):Promise<MainAd[]> =>{

    try{
       const cookieFavoriteAds = await getFavoriteAdsIdsAction();
            
        const favoriteAds =  cookieFavoriteAds.map( async( idAd) => {
            return (await getOneAdById(idAd) as AxiosResponse<MainAd>).data as MainAd;
        })
        return await Promise.all(favoriteAds);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(e){
        return Promise.all([]);
    }
}

export const getFavoriteAdsIdsAction = async( ):Promise<string[]> =>{
        const cookieStore = await cookies();
        const cookieFavoriteAds:string[] = []

        const cookiesArr = JSON.parse(  cookieStore.get('favorite-ads')?.value ?? '[]');
        if(cookieStore.has('favorite-ads')) cookieFavoriteAds.push(...cookiesArr) 
        return cookieFavoriteAds;
}