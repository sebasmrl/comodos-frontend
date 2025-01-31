import Link from "next/link";

export default async function Home() {
  return (
    <div className=" flex flex-col gap-2 items-start">
      <Link href={"/auth/login"} className="bg-blue-600 p-2 rounded-b-md" >Login</Link>
      <Link href={"/auth/register"} className="bg-blue-600 p-2 rounded-t-md" >Register</Link>
    </div>
  );
}
