//import Link from "next/link";
//import { SignOutButton } from "./components/SignOutButton";
import { auth } from "@/auth";
import Image from "next/image";
import { DrawerMenu } from "./components/drawer-menu/DrawerMenu";
import Link from "next/link";






export default async function Home() {

  const session = await auth();


  return (
    <div className="grid grid-cols-12  w-full max-h-dvh bg-background">

      <nav className="col-span-12 h-10 flex items-center justify-between px-2  py-9 border-b border-gray-600">
        <div className="flex flex-nowrap gap-2">
          <DrawerMenu />
          <Link href={"/"} className="flex justify-center self-center">
            <Image src={"/logo/logo-comodos.svg"} alt={"Logo de Comodos"} width={30} height={30} className="" />
            <p className="self-end text-2xl font-semibold ">omodos</p>
          </Link >
        </div>
      </nav>

      <main className=" col-span-12 overflow-x-hidden">
          
            <pre className="w-full">
             { JSON.stringify(session?.user.data,null, 3)}
            </pre>
          
      </main>


    </div>
  );
}






{/*    <Link href={"/auth/login"} className="bg-blue-600 p-2 rounded-b-md" >Login</Link>
      <Link href={"/auth/register"} className="bg-blue-600 p-2 rounded-t-md" >Register</Link> */}

      {/*         {(session?.user) ? <SignOutButton /> : <></>} */}