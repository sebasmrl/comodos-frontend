import { Coords } from "../coords.interface";

export interface MainAd{
    id:string;
    name:string;
    coords:Coords;
    address: string;
    locationCity:string;
    furnished:boolean;
    price:number;
    currency:string;
    rooms:number;
    bathrooms:number;
    squareMeters:number;
    period:string;
    propertyType:string;
    distance:number;
}