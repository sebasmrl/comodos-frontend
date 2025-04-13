'use server';

export const getGoogleMapsApikey = async():Promise<string>  =>{
    const apikey = process.env.GOOGLE_MAPS_API_KEY ?? '';
    return apikey;
  }