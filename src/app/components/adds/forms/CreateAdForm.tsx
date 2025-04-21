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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GoogleMapV2 } from "../../maps/GoogleMapV2";



interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    name?: string;

}


export const CreateAdForm = ({ className, ...props }: Props) => {


    const form = useForm<z.infer<typeof createAdFormSchema>>({
        resolver: zodResolver(createAdFormSchema),
        defaultValues: createAdFormSchemaDefaultValues,
    });




    function onSubmit(values: z.infer<typeof createAdFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        alert(JSON.stringify(values))


    }




    return (
        <div
            className="w-full h-auto"
            {...props}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cn("p-4 w-full grid grid-cols-12 gap-6 sm:px-20 md:px-4 ", className)}>
                    <div className="col-span-12 md:col-span-5 md:col-start-1 lg:col-span-5 lg:col-start-2 flex flex-col gap-2 border shadow-sm hover:shadow-md dark:border-slate-300/10 dark:hover:border-slate-300/20 rounded-md p-4 py-6 transition-all">
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
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-0  items-center  ">
                                    <FormLabel className="text-nowrap">Descripcion</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="min-w-20 min-h-28" placeholder="Describe el inmueble que estas arrendando o  alquilando" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel className="text-nowrap">Tipo de Propiedad</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} name={field.name}  >
                                            <SelectTrigger className="w-full space-y-0" >
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
                            name="locationCountry"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Pais</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ingresa el pais de ubicación" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="locationState"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Departamento - Estado</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ingresa el departamento o estado de ubicación" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="locationCity"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Ciudad - Municipio</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ingresa la ciudad o municipio de ubicación" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Dirección</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Ingresa la dirección del inmueble" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stratum"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Estrato</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Estrato del inmueble" className="min-w-20" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="period"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel className="text-nowrap">Periodo de facturación</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value} name={field.name}  >
                                            <SelectTrigger className="w-full space-y-0 " >
                                                <SelectValue placeholder="Periodo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Dia">Por día</SelectItem>
                                                <SelectItem value="Semana">Semanal</SelectItem>
                                                <SelectItem value="Mes">Mensual</SelectItem>
                                                <SelectItem value="Año">Anual</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-x-2">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="space-y-0 items-center ">
                                        <FormLabel className="text-nowrap">Precio</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-nowrap gap-2 items-center">
                                                <p>$</p>
                                                <Input {...field} type="number" placeholder="Precio del arrendamiento" className="min-w-20 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-number-spin-box]:hidden" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem className="space-y-0">
                                        <FormLabel className="text-nowrap">Divisa</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={String(field.value ?? undefined)} name={field.name}  >
                                                <SelectTrigger className="w-full space-y-0" >
                                                    <SelectValue placeholder="Divisa" />
                                                </SelectTrigger>
                                                <SelectContent className="space-y-0">
                                                    <SelectItem value="COP">COP</SelectItem>
                                                    <SelectItem value="USD">USD</SelectItem>
                                                    <SelectItem value="EUR">EUR</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="administrationCost"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Costo de administración (opcional)</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-nowrap gap-2 items-center">
                                            <p>$</p>
                                            <Input {...field} type="number" placeholder="Costo de administración" className="min-w-20 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-number-spin-box]:hidden" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="squareMeters"
                            render={({ field }) => (
                                <FormItem className="space-y-0 items-center m-0">
                                    <FormLabel className="text-nowrap">Metros cuadrados</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='number' placeholder="Metros Cuadrados" className="min-w-20 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-number-spin-box]:hidden" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-nowrap">Habitaciones</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={String(field.value ?? undefined)} name={field.name}   >
                                            <SelectTrigger className="w-full space-y-0 " >
                                                <SelectValue placeholder="Habitaciones" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                                <SelectItem value="6">6</SelectItem>
                                                <SelectItem value="7">7</SelectItem>
                                                <SelectItem value="8">8</SelectItem>
                                                <SelectItem value="9">9</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                    <FormLabel className="text-nowrap">Piso(s)</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='number' placeholder="Numero de pisos o piso del inmueble" className="min-w-20 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-number-spin-box]:hidden" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-x-2">
                            <FormField
                                control={form.control}
                                name="livingRoom"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="livingRoom" className="">Tiene sala: </Label>
                                                <Switch id="livingRoom" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="furnished"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="furnished" className="">Es amoblado: </Label>
                                                <Switch id="furnished" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                            <FormField
                                control={form.control}
                                name="hasKitchen"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="hasKitchen" className="">Tiene cocina: </Label>
                                                <Switch id="hasKitchen" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isSharedKitchen"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="isSharedKitchen" className="">Es cocina compartida: </Label>
                                                <Switch id="isSharedKitchen" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                            <FormField
                                control={form.control}
                                name="bathrooms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-nowrap">Baños</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={String(field.value ?? undefined)} name={field.name}   >
                                                <SelectTrigger className="w-full space-y-0 " >
                                                    <SelectValue placeholder="Baños" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isSharedBathroom"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between h-full">
                                                <Label htmlFor="isSharedBathroom" className="">Es baño compartido: </Label>
                                                <Switch id="isSharedBathroom" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="mt-2">
                            <h2 className="font-bold  pl-2 text-emerald-500">Servicios</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                            <FormField
                                control={form.control}
                                name="motoParking"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="motoParking" className="">Moto parqueadero: </Label>
                                                <Switch id="motoParking" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="carParking"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="carParking" className="">Auto parqueadero </Label>
                                                <Switch id="carParking" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="hasElectricLightService"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="hasElectricLightService" className="">Servicio eléctrico: </Label>
                                                <Switch id="hasElectricLightService" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hasWaterService"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="hasWaterService" className="">Servicio de agua: </Label>
                                                <Switch id="hasWaterService" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hasGasService"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md ">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="hasGasService" className="">Servicio de gas: </Label>
                                                <Switch id="hasGasService" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="hasInternetServiceIntegrated"
                                render={({ field }) => (
                                    <FormItem className="space-y-0  items-center border p-2 rounded-md ">
                                        <FormControl>
                                            <div className="flex items-center space-x-2 justify-between">
                                                <Label htmlFor="hasInternetServiceIntegrated" className="">Internet integrado: </Label>
                                                <Switch id="hasInternetServiceIntegrated" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="yard"
                            render={({ field }) => (
                                <FormItem className="space-y-0  items-center border p-2 rounded-md ">
                                    <FormControl>
                                        <div className="flex items-center space-x-2 justify-between">
                                            <Label htmlFor="yard" className="">Tiene patio y/o zona verde: </Label>
                                            <Switch id="yard" ref={field.ref} checked={field.value} onCheckedChange={field.onChange} value={field.value ? 1 : 0} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>

                    <hr className="col-span-12 md:hidden mt-2 border-primary/50" />

                    <div className="col-span-12 md:col-span-7 md:col-start-6  lg:col-span-5 flex flex-col">
                        <h2 className="text-center self-center p-2 font-thin">Selecciona las imagenes que mostrarás en tu publicación</h2>
                        <div className="col-span-5 grid grid-cols-3 gap-2 p-4 border border-slate-300/40 shadow-sm dark:border-slate-300/10 rounded-lg dark:hover:border-slate-300/20 hover:border-slate-300/60 hover:shadow-md transition-all">
                            <FormFieldInputFileImage form={form} labelText="Portada" name={'mainImage'} />
                            <FormFieldInputFileImage form={form} name={'adImage1'} labelText="1" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage2'} labelText="2" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage3'} labelText="3" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage4'} labelText="4" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage5'} labelText="5" style={{ label: 'bg-slate-800 font-thin' }} />
                            <FormFieldInputFileImage form={form} name={'adImage6'} labelText="6" style={{ label: 'bg-slate-800 font-thin' }} />
                        </div>
                        <div className="w-full relative">
                            <h2 className="text-md font-thin px-12 text-center p-2 pt-6">Selecciona en el mapa la ubicación donde se encuentra el inmueble</h2>
                            <div className="">
                                <GoogleMapV2 className="h-full p-0" classNameInputDiv="relative p-0" classNameInput="absolute top-4 bg-background w-[80%] right-[10%] xl:w-[50%] xl:right-[25%]" classNameMap="h-full min-h-96" getCoordsSelectedCallback={async ({ lat, lng }) => {
                                    //insertar coordenadas a ls valores del formulario
                                    form.setValue('coords', { lat, lng });
                                }} />
                            </div>
                        </div>
                    </div>




                    <Button type="submit" variant={'success'} className="self-end mt-4 mb-6 w-full col-span-12  lg:col-span-10 lg:col-start-2">Crear Anuncio</Button>
                </form>
            </Form>
        </div>
    )
}






