"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useEffect} from "react"
import { redirect, useSearchParams } from "next/navigation"



const FormSchema = z.object({
    email: z.string().email({ message: 'Debes insertar un correo válido' }),
    password: z.string().min(2, {
        message: "Tu contraseña no cumple los estandares requeridos",
    }),
})




export function LoginForm() {

    const session =  useSession();
    const params = useSearchParams()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
         await signIn('mainCredentials', { redirect: true, email: data.email, password: data.password, redirectTo: '/' });
    }

    useEffect(() => {

        

        if (params.has('error') && params.has('code')) {
            toast({
                title: "Lo sentimos no has podido iniciar sesión",
                variant: 'destructive',
                description: (<p>Verifica el correo y/o contraseña nuevamente</p>)
            })
        }
    }, [params])

    //redireccionar si está logueado
    if(session.status == 'authenticated') return redirect('/');

    return (
        <div className="flex flex-col justify-center w-full">

            <div className="grid grid-col-1 sm:grid-cols-2 gap-8 sm:gap-4 p-4 sm:p-6 lg:p-16">

                <div className="flex justify-center self-center">
                    <Image src={"/logo/logo-comodos-blanco.svg"} alt={"Logo de Comodos"} width={80} height={80} className="sm:w-20 lg:w-28" />
                    <p className="self-end text-4xl font-semibold sm:text-5xl lg:text-7xl">omodos</p>
                </div>

                <div className="col-span-1 sm:col-start-2 ">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3 sm:space-y-4 ">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Correo Electronico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Correo eléctronico" className="p-4" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Ingresa tu direccion de correo
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contraseña" type="password" className="p-4"{...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Digita tu contraseña de acceso
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full text-md md:text-lg" type="submit" ><h1>Iniciar Sesión</h1></Button>
                            <div className="flex col-span-6 justify-center items-center gap-1 ">
                                <p className="text-xs md:text-sm">¿Aun no tienes una cuenta?</p>
                                <span className="text-xs underline md:text-sm"><Link href={"/auth/register"}>Registrate</Link></span>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>

    )
}
