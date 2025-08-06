import { Coords } from "../coords.interface";
import { ProfileImage } from "../user/profile-image.interface";


interface UserAuth{
    id: string;
    email: string;
    names: string;
    lastnames: string;
    lastConnection: Date;
    state: boolean;
    coords: Coords;
    roles: string[];
    profileImage: ProfileImage;
}

export interface AuthResponse {
    user: UserAuth;
    accessToken: string;
    refreshToken: string;
}

export interface AuthorizeUser extends UserAuth{
    backendTokens: {
        accessToken: string,
        refreshToken: string
    };
}



export interface LoginParams {
    email: string;
    password: string;
}

export interface GenericErrorResponse {
    message: string | string[];
    error?: string;
    statusCode: number;
}

export interface RegistratedUserResponse{
    id: string;
    email: string;
    names: string;
    lastnames: string;
    lastConnection: Date;
    coords: Coords;
    roles: string[];
    phone:number,
    phoneCode: number;
    gender?: string;
    nationality:string;
    birthdate:Date;
    /* state: boolean; */
}

export interface RegisterUserRequestBody{
    email: string;
    names: string;
    lastnames: string;
    phone:number,
    phoneCode: number;
    nationality:string;
    birthdate:Date;
    /* state: boolean; */
    //dni:number;
}