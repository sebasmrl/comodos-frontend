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
import { InputOTPControlled } from "../../input-otp-controlled/InputOTPControlled"



const FormSchema = z.object({
    emailCode: z.number({ message: 'El codigo de seguridad es requerido' }),
    password: z.string().min(2, {
        message: "Tu contraseña no cumple los estandares requeridos",
    }),
    repassword: z.string(),
}).refine(data => data.password === data.repassword, {
    message: "Las contraseñas no coinciden.",
    path: ["repassword"], // Esto se refiere al campo que queremos validar
});




export function PasswordResetFormWithOTP() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            emailCode: 0,
            password: "",
            repassword: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if(data.emailCode.toString().length != 6) {
            customSonnerToast({
                variant: 'destructive',
                title: 'Debes insertar el codigo de seguidad',
                description: 'Hemos detectado que no estas insertando un código válido'
            })
            return;
        }
        customSonnerToast({
            variant: 'success',
            title: 'Los cambios han sido guardados',
            description: `${JSON.stringify(data, null, 3)}`
        })
    }


    return (
        <div className="flex flex-col w-full">

            <div className="grid grid-cols-12 gap-8 p-4 border w-full rounded-lg">
                <div className="col-span-12 w-full">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-8 gap-y-4    w-full" >

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 ">
                                        <FormLabel>Nueva Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa la nueva contraseña" type="password" className="p-4"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repassword"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 ">
                                        <FormLabel>Repite la contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Repite la contraseña" type="password" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="text-md col-span-8 mt-4"
                                variant={'ghost'}
                                type="button"
                                onClick={() => {
                                    customSonnerToast({
                                        variant: 'success',
                                        title: 'Código generado',
                                        description: 'Revisa la bandeja de entrada de tu correo electrónico'
                                    })
                                }
                                }>
                                <IoIosSave className="h-full w-full" />
                                <p>Generar código</p>
                            </Button>
                            <div className="flex flex-col col-span-8 gap-y-2">
                                <div className="flex flex-col items-center ">
                                    <p className="font-bold gap-1">Inserta tu codigo de un solo uso</p>
                                    <p className="font-thin">Revisa tu correo</p>
                                </div>
                                <InputOTPControlled
                                    onChange={(value) => {
                                        form.setValue('emailCode', Number(value))
                                    }}
                                />
                            </div>

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

