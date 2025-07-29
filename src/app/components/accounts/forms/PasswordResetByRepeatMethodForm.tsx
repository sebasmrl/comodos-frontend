"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { IoIosSave } from "react-icons/io"
import { customSonnerToast } from "../../custom-sonner-toast/customSonnerToast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { updateUserPasswordByRepeatMethod } from "@/actions/user/client-side/update-user-password-repeat-method.action"
import { GenericErrorResponse } from "@/interfaces"



const FormSchema = z.object({
    currentPassword: z.string().min(10, {
        message: "Tu contraseña debe tener 10 caracteres o más",
    }),
    newPassword: z.string().min(10, {
        message: "Tu contraseña debe tener 10 caracteres o más",
    }),
    reNewPassword: z.string().min(10, {
        message: "Tu contraseña debe tener 10 caracteres o más",
    }),
}).refine(data => data.newPassword === data.reNewPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["reNewPassword"], // Esto se refiere al campo que queremos validar
});




export function PasswordResetByRepeatMethodForm() {

    const session = useSession();
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            reNewPassword: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { reNewPassword, ...args } = data;


        if (session.data?.user) {
            const userPasswordWasUpdated = await updateUserPasswordByRepeatMethod({
                data: args,
                token: session.data.user.data.backendTokens.accessToken
            });


            if (userPasswordWasUpdated?.status >= 200 && userPasswordWasUpdated?.status < 300) {
                customSonnerToast({
                    title: 'Tu contraseña ha sido actualizada',
                    variant: 'success',
                    duration: 3000,
                })
                form.reset()
            } else {
                const errorMessage = (userPasswordWasUpdated.data as GenericErrorResponse).message;
                customSonnerToast({
                    title: 'No fue posible actualizar tu contraseña',
                    variant: 'destructive',
                    duration: 4000,
                    description: `${(typeof errorMessage === 'string') ? errorMessage : (errorMessage as string[]).join('\n')}`
                });
            }

        } else {
            router.push('auth/login')
        }

    }


    return (
        <div className="flex flex-col w-full">

            <div className="grid grid-cols-12 gap-8 p-4 border w-full rounded-lg">
                <div className="col-span-12 w-full">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-8 gap-y-4    w-full" >

                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 ">
                                        <FormLabel>Contraseña actual</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa tu contraseña actual" type="password" className="p-4"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 ">
                                        <FormLabel>Nueva contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa la nueva contraseña" type="password" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="reNewPassword"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 ">
                                        <FormLabel>Repite la contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Repite tu nueva contraseña" type="password" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <Button
                                className="text-md col-span-8 mt-4"
                                type="submit" >
                                <IoIosSave className="h-full w-full" />
                                <h1>Cambiar contraseña</h1>
                            </Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

