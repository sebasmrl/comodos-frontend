'use client';
import { cn } from "@/lib/utils";

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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";

import { createAdFormSchema, createAdFormSchemaDefaultValues } from "./create-ad-form-schema";
import { FormFieldInputFileImage } from "./FormFieldInputFileImage";



interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    name?: string;

}


export const CreateAdForm = ({ className, ...props }: Props) => {


    const form = useForm<z.infer<typeof createAdFormSchema>>({
        resolver: zodResolver(createAdFormSchema),
        defaultValues: createAdFormSchemaDefaultValues
    });



    function onSubmit(values: z.infer<typeof createAdFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        alert( JSON.stringify(values))


    }




    return (
        <div
            className="w-full h-auto"
            {...props}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cn("p-4 w-full grid grid-cols-12 gap-6 sm:px-20 md:px-4 ", className)}>
                    <div className="col-span-12 md:col-span-5 md:col-start-1 lg:col-span-5 lg:col-start-2 flex flex-col gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-0  items-center  ">
                                    <FormLabel className="text-nowrap">Título del Anuncio</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Escribe el título que quieres mostrar en tu anuncio" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} name={field.name}  >
                                            <SelectTrigger className="w-full space-y-0 " >
                                                <SelectValue placeholder="Tipo de Propiedad" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="casa">Casa</SelectItem>
                                                <SelectItem value="apartamento urbano">Apto Urbano</SelectItem>
                                                <SelectItem value="apartamento residencial">Apto Residencial</SelectItem>
                                                <SelectItem value="pension">Pensión</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Precio</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Precio del arrendamiento" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="floors"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center gap-1">
                                    <FormLabel className="text-nowrap">Pisos</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Numero de pisos o piso del inmueble" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-7 md:col-start-6  lg:col-span-5 flex flex-col">
                        <h2 className="text-center self-center p-2">Selecciona las imagenes que mostrarás en tu publicación</h2>
                        <div className="col-span-5 grid grid-cols-3 gap-2 p-4 border border-slate-300/20 shadow-sm dark:border-slate-300/10 rounded-lg dark:hover:border-slate-300/20 hover:border-slate-300/30 hover:shadow-md transition-all">
                            <FormFieldInputFileImage form={form} labelText="Portada" name={'mainImage'} />
                            <FormFieldInputFileImage form={form} name={'adImage1'} labelText="1" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage2'} labelText="2" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage3'} labelText="3" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage4'} labelText="4" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage5'} labelText="5" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage6'} labelText="6" style={{ label: 'bg-slate-800 font-thin' }} />
                        </div>
                    </div>

                 

                    <Button type="submit" variant={'success'} className="self-end mt-4 w-full col-span-12  lg:col-span-10 lg:col-start-2">Crear Anuncio</Button>
                </form>
            </Form>
        </div>
    )
}






