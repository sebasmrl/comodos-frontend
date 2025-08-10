import { Coords } from "../coords.interface";

export interface UpdateUser{
    names       ?:string;
    lastnames   ?:string;
    phone       ?:number;
    phoneCode   ?:number;
    coords      ?:Coords;
    gender      ?:string;
}



