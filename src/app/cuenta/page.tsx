

import { CLOUDFRONT_URL } from "@/config/env";

import { NavBar } from "../components/navbar/NavBar";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserCompleteData } from "@/actions/user/get-user-complete-data";
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface";
import { AccountTabs } from "../components/accounts/AccountTabs";


/* const user = {
    "id": "1e0b735d-6447-4b33-ac4e-75d99c221fb6",
    "dni": "34567665465",   
    "email": "sebastian@email.com",
    "names": "SEBASTIAN",
    "lastnames": "MORALES",
    "gender": null,
    "birthdate": new Date("2024-02-11"),
    "nationality": "Colombiano",
    "phone": "2345432",
    "phoneCode": "22",
    "lastConnection": new Date("2025-05-04T03:31:48.147Z"),
    "state": true,
    "coords": {
        "lat": 9.570868,
        "lng": -79.297333
    },
    "roles": [
        "USER",
        "SUPER_ADMIN"
    ],
    "profileImage": {
        "id": "8990a717-b1be-4b21-a462-f438f7d6f76c",
        "key": "8990a717-b1be-4b21-a462-f438f7d6f76c"
    }
} */


export default async function AccountPage() {

    const session = await auth();
     if (!session) redirect('/');
    const userData = (await getUserCompleteData(session.user.data.id)).data as CompleteUserProfile;
    return (
        <div className="grid grid-cols-12  w-full max-h-dvh bg-background overflow-y-auto">
            <NavBar className="col-span-12" />
            <AccountTabs userData={userData} cloudfrontUrl={CLOUDFRONT_URL}/>
        </div>
    );
}