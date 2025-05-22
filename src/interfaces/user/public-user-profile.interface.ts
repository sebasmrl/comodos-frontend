import { Ad } from "../ads/ads.interface";
import { ProfileImage } from "./profile-image.interface";


export interface PublicUserData{
    id:string;
    names:string; 
    lastnames:string;
    lastConnection:Date 
    profileImage: ProfileImage  
}

export interface PublicUserProfile extends PublicUserData{
    ads: Ad[]
}