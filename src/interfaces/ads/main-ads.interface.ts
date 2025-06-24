import { Coords } from "../coords.interface";


export interface MainAdsRequestParams{
    lat:number;
    lng:number;
    range?:number;
    offset?:number;
    limit?:number;
    maxPrice?:number;
    minPrice?:number;
    propertyType?:string;
    period?: string;
}


export interface MainAd{
    id:string;
    name:string;
    coords:Coords;
    address: string;
    location_city:string;
    furnished:boolean;
    price:number;
    currency:string;
    rooms:number;
    bathrooms:number;
    square_meters:number;
    period:string;
    property_type:string;
    distance:number;
    images: Image[]
}


export interface Image{
    id:string;
    fieldName:string;
    key:string;
}


