'use client';
import { getCookie, hasCookie, setCookie } from "cookies-next";



export const getCookieFavoriteAds = ():string[] =>{
    if(hasCookie('favorite-ads')){
        const cookieFavoriteAds = JSON.parse(getCookie('favorite-ads') as string ?? '[]');
        return cookieFavoriteAds;
    }
    return [];  
}



export const addToFavoritesAd = (id:string)=>{
    const  cookiesFavoriteAds = getCookieFavoriteAds();

    const flag = cookiesFavoriteAds.includes(id);
    if(flag) return;
    cookiesFavoriteAds.push(id);

    setCookie('favorite-ads', JSON.stringify(cookiesFavoriteAds));
    return {favoriteAds:cookiesFavoriteAds, count:cookiesFavoriteAds.length};
}



export const deleteOneFavoriteAd = (id:string)=>{
    const  cookiesFavoriteAds = getCookieFavoriteAds();
    const  newCookiesFavoriteAds= cookiesFavoriteAds.filter( (ad)=> ad != id && ad != null);

    setCookie('favorite-ads', JSON.stringify(newCookiesFavoriteAds));
    return {favoriteAds:newCookiesFavoriteAds, count:newCookiesFavoriteAds.length};
}

export const isPresentIdInFavorites = (id:string)=>{
    const flag = getCookieFavoriteAds().includes(id);
    return flag;
}