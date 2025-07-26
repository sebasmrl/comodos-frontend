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
import Image from "next/image"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

//import { registerAction } from "@/actions/auth"
import { registerUserClientAction } from "@/actions/auth/client-side/register-user.action"
import { customSonnerToast } from "@/app/components/custom-sonner-toast/customSonnerToast"
import { redirect, RedirectType } from "next/navigation"
import { GenericErrorResponse, RegistratedUserResponse } from "@/interfaces"



const FormSchema = z.object({
    dni: z.coerce.number({ message: "El campo no puede contener caracteres" }).int({ message: 'Tu cédula debe ser un numero entero' }).min(1000000, { message: 'No es un numero de cedula válido' }),
    email: z.string().email({ message: 'Debes insertar un correo válido' }),
    password: z.string().min(2, {
        message: "Tu contraseña no cumple los estandares requeridos",
    }),
    repassword: z.string().optional(),
    names: z.string().min(2).trim(),
    lastnames: z.string().min(2).trim(),
    nationality: z.string().min(2).trim(),
    phone: z.string().regex(/^\d{10,}$/, { message: "El número de teléfono movil no coincide", }),
    phoneCode: z.string().regex(/^\d{1,3}$/, { message: "EL indicatiovo telefonico no coincide con ningun registro" }).min(1, { message: "EL indicatiovo telefonico no coincide con ningun registro" }),
    birthdate: z.string().date().transform((val) => val.split('/').join('-')),
    gender: z.string().optional().nullable()
}).refine(data => data.password === data.repassword, {
    message: "Las contraseñas no coinciden.",
    path: ["repassword"], // Esto se refiere al campo que queremos validar
});




export function RegisterForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            dni: 0,
            email: "",
            password: "",
            repassword: "",
            nationality: "",
            names: "",
            lastnames: "",
            phone: "",
            phoneCode: "",
            birthdate: new Date().toLocaleString(),
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const reformatData = {
            ...data,
            phoneCode: Number(data.phoneCode),
            phone: Number(data.phone),
            dni: Number(data.dni),
            birthdate: new Date(data.birthdate),
            // oldBirth: data.birthdate
        }
        if (reformatData.repassword) { delete reformatData.repassword; }


        // registerAction is a server action

        const rs = await registerUserClientAction(reformatData);
        if (rs.status >= 200 && rs.status < 300) {
            const user = rs.data as RegistratedUserResponse;
            customSonnerToast({
                variant: 'success',
                title: "Te has registrado exitosamente en Comodos",
                description: `Te damos la bienvenida ${user.names.toLowerCase()}, ahora puedes iniciar sesión con nosotros`,
            })
            redirect('/auth/login', RedirectType.replace);
        }else{
            const errorMessage = (rs.data as GenericErrorResponse).message;
            customSonnerToast({
                variant: 'destructive',
                title: 'Upps! No te has podido registrar, intentalo nuevamente',
                description:`${(typeof errorMessage === 'string') ? errorMessage : (errorMessage as string[]).join('\n')}`
            })
        }
    }


    return (
        <div className="flex flex-col justify-center w-full">

            <div className="grid grid-col-1 sm:grid-cols-8 gap-8 sm:gap-4 p-4 sm:px-6 lg:px-64 md:gap-10 my-10">

                <div className="flex col-span-8 justify-center flex-nowrap sm:justify-center mb-8">
                    <Link href={"/"} className="flex justify-center self-center">
                        <Image src={"/logo/logo-comodos.svg"} alt={"Logo de Comodos"} width={50} height={50} className="" />
                        <p className="self-end text-2xl font-semibold sm:text-3xl lg:text-5xl">omodos</p>
                    </Link>
                    <p className="self-end text-2xl font-extralight sm:text-3xl lg:text-5xl px-2 sm:px-4 text-primary">Registro</p>

                </div>

                <div className="col-span-8 row-start-2 ">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-8  gap-4 sm:gap-y-6 gap-x-4">
                            <FormField
                                control={form.control}
                                name="names"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre(s)" type="text" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastnames"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Apellidos</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Apellido(s)" type="text" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dni"

                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Cedula de Ciudadanìa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa tu número cedula" type="text" className="p-4" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"

                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Correo Electronico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Correo eléctronico" className="p-4" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contraseña" type="password" className="p-4"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repassword"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Repite la contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Repetir contraseña" type="password" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nationality"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-4">
                                        <FormLabel>Nacionalidad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="¿De que país eres?" type="text" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthdate"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-3 md:col-span-2">
                                        <FormLabel>Fecha de nacimiento:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="2021-02-11" type="date" className="p-4 flex w-full justify-center"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="col-span-8 sm:col-span-3 md:col-span-2">
                                        <FormLabel>Género</FormLabel>
                                        <FormControl>
                                            {/* <Input placeholder="2021-02-11" type="date" className="p-4 flex w-full justify-center"{...field} /> */}
                                            <Select >
                                                <SelectTrigger className="" >
                                                    <SelectValue placeholder="Selecciona tu género" {...field} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="M">Masculino</SelectItem>
                                                    <SelectItem value="F">Femenino</SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneCode"
                                render={({ field }) => (
                                    <FormItem className="col-span-2 sm:col-span-1 sm:row-start-5">
                                        <FormLabel>Indicativo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="57" type="text" maxLength={3} className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="col-span-6 sm:col-span-3 ">
                                        <FormLabel>Número de Contacto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="311121234" type="tel" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                            <Button className="text-md md:text-lg col-span-8 mt-10" type="submit" ><h1>Registrarme</h1></Button>
                            <div className="flex col-span-8 justify-center items-center gap-1">
                                <p className="text-xs md:text-sm">¿Ya tienes una cuenta?</p>
                                <span className="text-xs underline md:text-sm"><Link href={"/auth/login"}>Iniciar Sesión</Link></span>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>

    )
}

