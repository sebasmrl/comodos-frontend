import { Coords } from "../coords.interface";

export interface MainAdsResponse{
    ad_id:string;
    ad_name:string;
    ad_coords:Coords;
    ad_address: string;
    ad_locationCity:string;
    ad_furnished:boolean;
    ad_price:number;
    ad_currency:string;
    ad_rooms:number;
    ad_bathrooms:number;
    ad_squareMeters:number;
    ad_period:string;
    ad_propertyType:string;
    ad_distance:number;
}

export interface MainAddsRequestParams{
    lat:number;
    lng:number;
    range?:number;
    offset?:number;
    limmit?:number;
    maxPrice?:number;
    minPrice?:number;
}
