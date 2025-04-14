import { ProfileImage } from "./profile-image.interface";


export interface PublicUserProfile{
    names:string; 
    lastnames:string;
    lastConnection:Date 
    profileImage: ProfileImage
}