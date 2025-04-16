import { ProfileImage } from "./profile-image.interface";


export interface PublicUserProfile{
    id:string;
    names:string; 
    lastnames:string;
    lastConnection:Date 
    profileImage: ProfileImage
}