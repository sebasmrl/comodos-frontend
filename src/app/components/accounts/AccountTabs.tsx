'use client';


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface";
import { AccountInformation } from "./AccountInformation";
import { AccountEditForm } from "./forms/AccountEditForm";
import { PasswordResetByRepeatMethodForm } from "./forms/PasswordResetByRepeatMethodForm";


interface Props{
    cloudfrontUrl:string;
    userData: CompleteUserProfile
}

export const AccountTabs = ({ userData, cloudfrontUrl}:Props) => {
  return (
    <Tabs defaultValue="cuenta" className="col-span-12 md:col-span-6 md:col-start-4 p-2 py-5">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="cuenta">Sobre mi</TabsTrigger>
                    <TabsTrigger value="editar">Editar</TabsTrigger>
                    <TabsTrigger value="contrasena">Contraseña</TabsTrigger>
                </TabsList>
                <TabsContent value="cuenta" className="w-full">
                    <AccountInformation cloudFrontUrl={cloudfrontUrl} userData={userData} />
                </TabsContent>
                <TabsContent value="editar" className="w-full">
                    <AccountEditForm userData={userData} cloudFrontUrl={cloudfrontUrl} />
                </TabsContent>
                <TabsContent value="contrasena" className="w-full">
                    <PasswordResetByRepeatMethodForm/>
                </TabsContent>
            </Tabs>
  )
}
