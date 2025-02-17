
import { DrawerMenu } from '../drawer-menu/DrawerMenu'
import Link from 'next/link'
import Image from 'next/image'

export const NavBar = () => {
    return (
        <nav className="flex items-center justify-between px-2 w-full sticky top-0 bg-orange-100  bg-opacity-5  backdrop-blur-sm">
            <div className="flex flex-nowrap gap-2 py-5">
                <DrawerMenu />
                <Link href={"/"} className="flex justify-center self-center ">
                    <Image src={"/logo/logo-comodos.svg"} alt={"Logo de Comodos"} width={30} height={30} className="" />
                    <p className="self-end text-2xl font-semibold ">omodos</p>
                </Link >
            </div>
        </nav>
    )
}
