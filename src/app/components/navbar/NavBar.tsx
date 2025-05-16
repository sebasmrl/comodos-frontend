
import { CLOUDFRONT_URL } from '@/config/env'

import { DrawerMenu } from '../drawer-menu/DrawerMenu'
import Link from 'next/link'
import Image from 'next/image'
import { mainMenu } from '../drawer-menu/menus-data/main-menu'
import { ModeToggle } from '../mode-toggle/ModeToggle'
import { cn } from '@/lib/utils'

interface Props{
    className?:string;
}

export const NavBar = ({className}:Props) => {
    return (
        <nav className={cn("flex items-center justify-between px-2 w-full sticky top-0 bg-gradient-to-r from-slate-100/20 dark:from-slate-900/10 via-orange-500/85   to-orange-600/90 dark:to-orange-600/90  backdrop-blur-sm z-50", className)}>
            <div className="flex flex-nowrap gap-2 py-4">
                <DrawerMenu menu={ mainMenu } cloudfrontUrl={CLOUDFRONT_URL} />
                <Link href={"/"} className="flex justify-center self-center ">
                    <Image src={"/logo/logo-comodos.svg"} alt={"Logo de Comodos"} width={30} height={30} className="" />
                    <p className="self-end text-2xl font-semibold ">omodos</p>
                </Link >
            </div>
            <ModeToggle />
        </nav>
    )
}
