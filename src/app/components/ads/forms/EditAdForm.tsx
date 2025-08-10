'use client';
import { useEffect } from "react";

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

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { IoIosSave } from "react-icons/io";

import { customSonnerToast } from "../../custom-sonner-toast/customSonnerToast";
import { FormFieldInputFileImage } from "./FormFieldInputFileImage";
import { editAdFormSchema } from "./schemas/edit-ad-form-scheme";
import { GoogleMapV2 } from "../../maps/GoogleMapV2";

import { Ad } from "@/interfaces/ads/ads.interface";
import { PropertyType } from "@/interfaces/property-types/property-type.interface";
import { AdPeriod } from "@/interfaces/ad-period/ad-period.interface";
import { updateAdImages } from "@/actions/ads/client-side/update_ad_images.action";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { updateAd } from "@/actions/ads/client-side/update-ad.action";



interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    name?: string;
    propertyTypes: PropertyType[];
    adPeriods: AdPeriod[];
    defaultData: Ad,
    imagesServerDomain: string | null;
}



export const EditAdForm = ({ className, propertyTypes, adPeriods, defaultData, imagesServerDomain, ...props }: Props) => {


    const session = useSession();
    const router = useRouter();

    const { propertyType, period, images, rooms, bathrooms, price, administrationCost, coords, squareMeters, floors, ...rest } = defaultData;
    const defaultFormValues = {
        propertyType: propertyType.id,
        period: period.id,
        price: String(price),
        floors: String(floors),
        squareMeters: String(squareMeters),
        rooms: String(rooms),
        bathrooms: String(bathrooms),
        administrationCost: administrationCost ? String(administrationCost) : '0',
        coords,
        ...rest
    }

    const form = useForm<z.infer<typeof editAdFormSchema>>({
        resolver: zodResolver(editAdFormSchema),
        defaultValues: defaultFormValues,
    });

    //const { propertyTypes, isLoadingPropertyTypes } = usePropertyTypes();  // way get propertyTypes from client side

    const coordsState = form.getFieldState('coords');

    async function onSubmit(values: z.infer<typeof editAdFormSchema>) {

        if (!(session?.data?.user)) redirect('/auth/login');
        const { main, ad_image_1, ad_image_2, ad_image_3, ad_image_4, ad_image_5, ad_image_6, ...data } = values;

        const reformatData = {
            ...data,
            rooms: Number(data.rooms),
            floors: Number(data.floors),
            administrationCost: Number(data.administrationCost),
            bathrooms: Number(data.bathrooms),
            squareMeters: Number(data.squareMeters),
            price: Number(data.price)
        }

        const updatedAd = await updateAd(defaultData.id, reformatData, session.data.user.data.backendTokens.accessToken)
       


        const images = {
            main,
            ad_image_1,
            ad_image_2,
            ad_image_3,
            ad_image_4,
            ad_image_5,
            ad_image_6
        };

        const imagenesSubidas = await updateAdImages(
            defaultFormValues.id,
            images,
            session.data?.user.data.backendTokens.accessToken ?? ''
        );

        
        if (imagenesSubidas != null && imagenesSubidas?.status >= 400) {
            customSonnerToast({
                title: 'Upps!! No se pudieron subir tus imagenes',
                variant: 'destructive',
                duration: 4000,
                description: 'Ha ocurrido un error inesperado y las imagenes de tu anuncio no fueron correctamente guardadas '
            })
        }

         if (updateAd !=null && updatedAd.status >= 400) {
            customSonnerToast({
                title: 'Upps!! No se pudo actualizar el anuncio',
                variant: 'destructive',
                duration: 4000,
                description: `Ha occurido un error inesperado y no se ha podido actualizar tu anuncio, intentalo nuevamente`
            })
        } else {
            customSonnerToast({
                title: 'Anuncio actualizado con éxito',
                variant: 'success',
                duration: 4000,
                description: `El anuncio '${values.name}' ha sido actualizado con éxito`
            });
            router.push('/anuncios')
        }

        

    }



    useEffect(() => {
        if (coordsState.error) {
            customSonnerToast({
                title: 'No has guardado ninguna ubicación',
                variant: 'destructive',
                duration: 2000,
                description: "Debes seleccionar alguna ubicación en el mapa para el anuncio que quieres publicar.",
            })
        }
    }, [coordsState])




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
                                                {
                                                    propertyTypes.map(propertyType => (
                                                        <SelectItem
                                                            key={propertyType.id}
                                                            value={propertyType.id}>
                                                            {propertyType.name}
                                                        </SelectItem>
                                                    ))
                                                }
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
                                                {/* <SelectItem value="Dia">Por día</SelectItem>
                                                <SelectItem value="Semana">Semanal</SelectItem>
                                                <SelectItem value="Mes">Mensual</SelectItem>
                                                <SelectItem value="Año">Anual</SelectItem> */}
                                                {
                                                    adPeriods.map(adPeriod => (
                                                        <SelectItem
                                                            key={adPeriod.id}
                                                            value={adPeriod.id}>
                                                            {adPeriod.name}
                                                        </SelectItem>
                                                    ))
                                                }
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
                                                <Switch
                                                    id="isSharedKitchen" ref={field.ref}
                                                    checked={field.value}
                                                    onCheckedChange={(isChecked) => {
                                                        field.onChange(isChecked)
                                                        if (isChecked) form.setValue('hasKitchen', true)
                                                    }} value={field.value ? 1 : 0} />
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

                            <FormFieldInputFileImage
                                form={form}
                                labelText="Portada"
                                name={'main'}
                                imageUrl={
                                    images.filter(image => image.fieldName == 'main')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'main')[0].key}`
                                        : null}
                            />
                            <FormFieldInputFileImage
                                form={form}
                                name={'ad_image_1'}
                                labelText="1"
                                imageUrl={
                                    images.filter(image => image.fieldName == 'ad_image_1')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'ad_image_1')[0].key}`
                                        : null}
                                style={{ label: 'bg-slate-800 font-thin' }}
                            />
                            <FormFieldInputFileImage
                                form={form}
                                name={'ad_image_2'}
                                labelText="2"
                                imageUrl={
                                    images.filter(image => image.fieldName == 'ad_image_2')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'ad_image_2')[0].key}`
                                        : null}
                                style={{ label: 'bg-slate-800 font-thin' }}
                            />
                            <FormFieldInputFileImage
                                form={form}
                                name={'ad_image_3'}
                                labelText="3"
                                imageUrl={
                                    images.filter(image => image.fieldName == 'ad_image_3')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'ad_image_3')[0].key}`
                                        : null}
                                style={{ label: 'bg-slate-800 font-thin' }}
                            />
                            <FormFieldInputFileImage
                                form={form}
                                name={'ad_image_4'}
                                labelText="4"
                                imageUrl={
                                    images.filter(image => image.fieldName == 'ad_image_4')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'ad_image_4')[0].key}`
                                        : null}
                                style={{ label: 'bg-slate-800 font-thin' }}
                            />
                            <FormFieldInputFileImage
                                form={form}
                                name={'ad_image_5'}
                                labelText="5"
                                imageUrl={
                                    images.filter(image => image.fieldName == 'ad_image_5')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'ad_image_5')[0].key}`
                                        : null}
                                style={{ label: 'bg-slate-800 font-thin' }}
                            />
                            <FormFieldInputFileImage
                                form={form}
                                name={'ad_image_6'}
                                labelText="6"
                                imageUrl={
                                    images.filter(image => image.fieldName == 'ad_image_6')[0] && imagesServerDomain
                                        ? `${imagesServerDomain}/${images.filter(image => image.fieldName == 'ad_image_6')[0].key}`
                                        : null}
                                style={{ label: 'bg-slate-800 font-thin' }}
                            />
                        </div>
                        <div className="w-full relative">
                            <h2 className="text-md font-thin px-12 text-center p-2 pt-6">Selecciona en el mapa la ubicación donde se encuentra el inmueble</h2>
                            <div className="">
                                <GoogleMapV2
                                    className="h-full p-0"
                                    classNameInputDiv="relative p-0"
                                    classNameInput="absolute top-4 bg-background w-[80%] right-[10%] xl:w-[50%] xl:right-[25%]"
                                    classNameMap="h-full min-h-96"
                                    initialZoom={16}
                                    initialCoords={coords}
                                    getCoordsSelectedCallback={async ({ lat, lng }) => {
                                        //insertar coordenadas a ls valores del formulario
                                        form.setValue('coords', { lat, lng });
                                        customSonnerToast({
                                            title: 'Nueva Ubicación Seleccionada',
                                            variant: 'success',
                                            duration: 2000,
                                            description: 'Has seleccionado una nueva ubicación para tu anuncio'
                                        })
                                    }} />
                            </div>
                        </div>
                    </div>




                    <Button type="submit" variant={'success'} className="self-end mt-4 mb-6 w-full col-span-12  lg:col-span-10 lg:col-start-2"><IoIosSave className="h-full w-full" /> Guardar Cambios</Button>
                </form>
            </Form>
        </div>
    )
}
