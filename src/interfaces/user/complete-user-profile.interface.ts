import { Coords } from "../coords.interface";
import { ProfileImage } from "./profile-image.interface";

export interface CompleteUserProfile{
    id:string;
    dni:string;
    email:string;
    names:string;
    lastnames:string;
    gender?:string | null;
    coords?:Coords;
    state:boolean;
    nationality:string;
    birthdate: Date;
    phone:string;
    phoneCode:string;
    lastConnection:Date;
    roles:string[];
    profileImage?: ProfileImage
}