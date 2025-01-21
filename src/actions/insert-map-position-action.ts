'use server';

export const insertMapPositionToUser = async( position:{ lat:number, lng: number}):Promise<boolean>=>{
    console.log('insertMapPositionToUser ',{position})
    return true;
}


export const insertMapPositionToAd = async(position:{ lat:number, lng: number},):Promise<boolean>=>{
    console.log('insertMapPositionToAd ', {position})
    return true;
}