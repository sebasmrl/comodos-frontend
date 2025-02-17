'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SignOutButton } from "../SignOutButton";
import { Separator } from "@/components/ui/separator";

import { IoMenuOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { Menu } from "@/interfaces";


interface Props{
  menu: Menu[];
}

export const DrawerMenu = ({ menu}:Props) => {

  const session = useSession();
  const path = usePathname();

  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger>
          <IoMenuOutline size={40} className=" cursor-pointer text-sidebar-accent  aspect-square rounded-full dark:hover:bg-gray-800 dark:hover:bg-opacity-40 p-1" />
        </DrawerTrigger>
        <DrawerContent className="w-56 h-dvh rounded-none  border-border ">
          <DrawerHeader className="bg-inherit text-inherit">
            <DrawerTitle className="pt-0 mt-0">
              <div className="flex flex-nowrap gap-2 ">
                <DrawerClose className="">
                  <IoMenuOutline size={40} className="cursor-pointer text-sidebar-accent aspect-square rounded-full dark:hover:bg-gray-800 dark:hover:bg-opacity-40 p-1" />
                </DrawerClose>
                <Link href={"/"} className="flex justify-center self-center">
                  <Image src={"/logo/logo-comodos.svg"} alt={"Logo de Comodos"} width={30} height={30} className="aspect-square" />
                  <p className="self-end text-2xl font-semibold ">omodos</p>
                </Link>
              </div>
            </DrawerTitle>

            <DrawerDescription></DrawerDescription>

            <NavigationMenu className="w-full min-w-full flex-col justify-stretch items-stretch ">
              <Separator />

              <NavigationMenuList className=" flex-col min-w-full space-x-0 gap-1 py-3" >
                {
                  menu.map((item) => (
                    <NavigationMenuItem className="w-full" key={`${item.title}-${item.href}`}>
                      <Button className="bg-transparent p-0 m-0 w-full" disabled={(item.auth)? (session.status !="authenticated")? true :false: false }> {/* disabled */}
                        <Link href={item.href} passHref legacyBehavior className="">
                          <NavigationMenuLink active={ path==item.href } className={`${navigationMenuTriggerStyle()} w-full min-w-full flex gap-1 text-foreground `} aria-disabled>
                            <span>{item?.icon}</span> <span>{item.title}</span>
                          </NavigationMenuLink>
                        </Link>
                      </Button>
                    </NavigationMenuItem>
                  ))
                }

              </NavigationMenuList>
            </NavigationMenu>

          </DrawerHeader>

          <DrawerFooter>
            {
              session.status == "unauthenticated" &&
              (<Link href={"/auth/login"}>
                <Button className="w-full h-full">Iniciar Sesión</Button>
              </Link>)
            }
            {
              session.status == "authenticated" &&
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-4 hover:dark:bg-accent p-2 rounded-md">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{`${session.data.user.data.names.substring(0, 1)}${session.data.user.data.lastnames.substring(0, 1)}`}</AvatarFallback>
                    </Avatar>
                    <p className="text-base font-semibold capitalize">
                      <span className="lowercase">
                        {session.data.user.data.names}
                      </span>
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-border ">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href={'/cuenta'} className="w-full">Perfil</Link></DropdownMenuItem>
                  <DropdownMenuItem><SignOutButton /></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>



            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
