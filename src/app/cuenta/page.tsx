

import { CLOUDFRONT_URL } from "@/config/env";

import { NavBar } from "../components/navbar/NavBar";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserCompleteData } from "@/actions/user/get-user-complete-data";
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface";
import { AccountTabs } from "../components/accounts/AccountTabs";


export default async function AccountPage() {

    const session = await auth();
     if (!session?.user) redirect('/');
    const userData = (await getUserCompleteData(session.user.data.id)).data as CompleteUserProfile;
    return (
        <div className="grid grid-cols-12  w-full max-h-dvh bg-background overflow-y-auto">
            <NavBar className="col-span-12" />
            <AccountTabs userData={userData} cloudfrontUrl={CLOUDFRONT_URL}/>
        </div>
    );
}