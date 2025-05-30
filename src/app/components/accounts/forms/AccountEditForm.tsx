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

import { BiImageAdd } from "react-icons/bi";

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IoIosSave } from "react-icons/io"
import { customSonnerToast } from "../../custom-sonner-toast/customSonnerToast"
import Image from "next/image"
import { getUrlImageFromFileList } from "@/utils/get-url-image-from-filelist"
import { CompleteUserProfile } from "@/interfaces/user/complete-user-profile.interface"



const FormSchema = z.object({
    profileImage: z.instanceof(FileList).refine((img) => img[0]?.size < 2500000 || img[0] == null, {
        message: "El archivo debe ser menor a 2.5MB",
    }).optional().nullable(),
    names: z.string({ message: 'El campo nombres es requerido' }).min(2).trim(),
    lastnames: z.string({ message: 'El campo apellidos es requerido' }).min(2).trim(),
    phone: z.string().regex(/^\d{10,}$/, { message: "El número de teléfono movil no coincide", }),
    phoneCode: z.string().regex(/^\d{1,3}$/, { message: "EL indicatiovo telefonico no coincide con ningun registro" }).min(1, { message: "EL indicatiovo telefonico no coincide con ningun registro" }),
    gender: z.string().optional().nullable()
})


interface Props {
    cloudFrontUrl: string;
    userData: CompleteUserProfile;
}

export function AccountEditForm({ cloudFrontUrl, userData }: Props) {
    const { names, lastnames, phone, phoneCode, profileImage } = userData;
    console.log({userData})
    const defaultValues = { names, lastnames, phone, phoneCode }
    const imageUrl = `${cloudFrontUrl}/${profileImage?.key}`;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues,
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        customSonnerToast({
            variant: 'success',
            title: 'Los cambios han sido guardados',
            description: `${JSON.stringify(data, null, 3)}`
        })
    }


    return (
        <div className="flex flex-col w-full">

            <div className="grid grid-cols-12 gap-8 py-6 px-4  border w-full rounded-lg  ">
                <div className="col-span-12 w-full">
                    <Form  {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-8 gap-y-4 gap-x-4 w-full" >
                            <FormField
                                control={form.control}
                                name={'profileImage'}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="grid grid-cols-8  gap-2 space-y-2 col-span-8" >
                                            <FormLabel className="col-span-8 text-center text-lg w-full min-w-full">Imagen de perfil</FormLabel>
                                            <FormControl className="">

                                                <div className="col-span-8 flex justify-center">
                                                    <div className={"min-h-36 max-h-36 sm:min-w-30 sm:min-h-30 relative rounded-full overflow-hidden  flex justify-center shadow-sm border border-slate-900/5 dark:border-slate-300/10 aspect-square"}>
                                                        <Input
                                                            type={'file'}
                                                            accept="image/jpg, image/png, image/jpeg, image/webp, image/svg, image/svg+xml"
                                                            className={"min-h-36 max-h-36 sm:min-w-30 sm:min-h-30 w-full h-full z-20 bg-transparent text-transparent text-center absolute top-0 opacity-0 hover:bg-primary/60 hover:opacity-30 cursor-pointer p-2 transition-colors overflow-hidden rounded-sm"}
                                                            {...form.register('profileImage')}
                                                        />


                                                        <div className="overflow-hidden w-full h-full flex justify-center items-center min-h-36 max-h-36 ">
                                                            {

                                                                getUrlImageFromFileList({ fileList: field.value as FileList })
                                                                    ?
                                                                    <Image
                                                                        src={getUrlImageFromFileList({ fileList: field.value as FileList }) ?? ''}
                                                                        alt={""}
                                                                        width={100}
                                                                        height={100}
                                                                        className={"w-full h-auto min-h-20 scale-150 object-cover aspect-square"}
                                                                    />
                                                                    : profileImage
                                                                        ?
                                                                        <Image
                                                                            src={`${imageUrl}?time=${Date.now()}`}
                                                                            alt={""}
                                                                            width={100}
                                                                            height={100}
                                                                            className={"w-full h-auto min-h-20 scale-120"}
                                                                        />
                                                                        : <BiImageAdd className={"w-full h-auto min-h-10 max-h-12 text-secondary-foreground "} />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />


                            <FormField
                                control={form.control}
                                name="names"
                                render={({ field }) => (
                                    <FormItem className="col-span-8">
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
                                    <FormItem className="col-span-8 ">
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
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="col-span-8  ">
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
                                    <FormItem className="col-span-2 ">
                                        <FormLabel>Indicativo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="57" type="text" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="col-span-6">
                                        <FormLabel>Número de Contacto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="311121234" type="tel" className="p-4 "{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="text-md col-span-8 mt-10" type="submit" ><IoIosSave className="h-full w-full" /><h1>Guardar</h1></Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

