import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CLOUDFRONT_URL } from "@/config/env";
import { redirect } from "next/navigation";
import { NavBar } from "../components/navbar/NavBar";

export default async function AccountPage() {

    const session = await auth();

    if (!session) redirect('/');
    return (
        <div className="grid grid-cols-12 h-dvh w-full max-h-dvh bg-background ">
            <NavBar />
            <div className=" col-span-12 overflow-x-hidden flex flex-col">
            <Avatar className="h-80 w-80 border-2" >
                <AvatarImage height={100} width={100} src={`${CLOUDFRONT_URL}/${session.user.data.profileImage.key}`} />
                <AvatarFallback>{`${session?.user?.data.names.substring(0, 1)}${session?.user?.data?.lastnames.substring(0, 1)}`}</AvatarFallback>
            </Avatar>


                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
                <span className="">nsicsk</span>
            </div>
        </div>
    );
}