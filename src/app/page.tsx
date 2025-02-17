import { auth } from "@/auth";
import { NavBar } from "./components/navbar/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";



export default async function Home() {

  const session = await auth();


  return (

    <ScrollArea
      className="w-full h-dvh overflow-x-hidden pr-2.5 "
      type="always"
      scrollAreaScrollbarStyle="bg-orange-300 dark:bg-opacity-5 "
    >
      <NavBar />
      <div className="grid grid-cols-12  w-full bg-background">


        <div className="col-span-12 overflow-x-hidden " >


          <pre className="w-full">
            {JSON.stringify(session?.user.data, null, 3)}
          </pre>
          <h2 className="bg-slate-500">epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
          <h2>epaaa</h2>
        </div>
        {/* </div> */}
      </div>
    </ScrollArea>

  );
}






{/*    <Link href={"/auth/login"} className="bg-blue-600 p-2 rounded-b-md" >Login</Link>
      <Link href={"/auth/register"} className="bg-blue-600 p-2 rounded-t-md" >Register</Link> */}

{/*         {(session?.user) ? <SignOutButton /> : <></>} */ }