//import {  User as UserDefault } from '@auth/core/types';
//import { User as UserDefault } from 'next-auth';

declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User{
        data: {
            id: string;
            email: string;
            names: string;
            lastnames: string;
            lastConnection: Date;
            state: boolean;
            coords: {
                lat: number;
                lng: number;
            };
            roles: string[];
            profileImage: {
                id: string;
                key: string;
            };

            backendTokens: {
                accessToken: string,
                refreshToken: string
            };
        }
    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    /*  interface Account { 
       provider: string; 
       type: string; 
       providerAccountId: string; 
       access_token: string; 
       refresh_token?: string; 
       expires_at?: number; 
       token_type?: string; 
       scope?: string; 
       id_token?: string; 
       session_state?: string; 
     } */

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    export interface Session {
        user: User
    }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        /** OpenID ID Token */
        //idToken?: string
        user: User
    }
}