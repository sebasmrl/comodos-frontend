import { Coords } from "../coords.interface";


export interface MainAddsRequestParams{
    lat:number;
    lng:number;
    range?:number;
    offset?:number;
    limit?:number;
    maxPrice?:number;
    minPrice?:number;
    propertyType?:string;
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
    owner: Owner
    images: Image[]
}

interface Owner{
        id:string,
        names:string;
        lastnames:string;
        profileImage:ProfileImage
}

interface Image{
    id:string;
    fieldName:string;
    key:string;
}

interface ProfileImage{
    id:string;
    key:string,
}

