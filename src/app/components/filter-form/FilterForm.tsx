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
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { filterScheme, filterSchemeDefaultValues } from "./filterScheme";
import { usePropertyTypesStore } from "@/store/property-types.store";
import { usePeriodsStore } from "@/store/periods.store copy";
import { getCookieFilterAds, setCompleteCookieFilterAdsProp } from "@/actions/cookies/client/filter/filter";
import { useState } from "react";
import { setFilterAdsInLocalStorage } from "@/actions/local-storage/filter-local-storage.action";
//import { useQueryParams } from "@/hooks/use-query-params";




interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    name?: string;
    onOpenAndCloseDialog: (v: boolean) => void
}



export const FilterForm = ({ className, onOpenAndCloseDialog, ...props }: Props) => {

    const router = useRouter();

    //Obtener valores iniciales de la DB desde el estado gestionado por zustand
    const { propertyTypes } = usePropertyTypesStore();
    const { periods } = usePeriodsStore();

    const [filterCookiesState, setFilterCookiesState] = useState(getCookieFilterAds());

    const form = useForm<z.infer<typeof filterScheme>>({
        resolver: zodResolver(filterScheme),
        defaultValues: { ...filterSchemeDefaultValues, ...filterCookiesState, range: filterCookiesState.range ? [Number(filterCookiesState.range)] : filterSchemeDefaultValues.range },
    });



    function onSubmit(values: z.infer<typeof filterScheme>) {
        onOpenAndCloseDialog(false);
        const plainOptions = { ...values, range: values?.range[0] }

        // parametros filtrados cuando no se tienen en cuenta pero deben tener un valor en el form
        const paramsObj = Object.entries(plainOptions).filter(([k, v],) => {
            if (!(v == 0 || v == 'all')) return [k, v];
        });

        if(filterCookiesState?.lat && filterCookiesState?.lng){
            paramsObj.push(['lat', String(filterCookiesState.lat)])
            paramsObj.push(['lng', String(filterCookiesState.lng)])
        }
        
        // valores del filtro en cadena de texto de queryParams
        const params = paramsObj.map(([k, v],) => {
            return `${k}=${v}`;
        }).join('&')


        const paramsArrToObj = paramsObj.reduce((prev, curr) => {
            const obj = { [curr[0]]: curr[1] }
            return { ...prev, ...obj }
        }, {})
        const filters = setCompleteCookieFilterAdsProp({ ...paramsArrToObj, lat: filterCookiesState?.lat, lng: filterCookiesState?.lng });
        setFilterCookiesState(getCookieFilterAds());
        setFilterAdsInLocalStorage(filters);


        router.push(`?${params}`);
    }



    return (
        <div
            {...props} className={cn(className, "p-4")}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-y-2 items-stretch">
                    <FormField
                        control={form.control}
                        name="range"
                        render={({ field }) => (
                            <FormItem className="space-y-0 ">
                                <FormLabel className="">Rango de Búsqueda</FormLabel>
                                <FormControl>
                                    <div className="flex flex-nowrap gap-x-2 min-w-52">
                                        <Slider defaultValue={field.value} max={60} step={1} value={field.value} onValueChange={field.onChange} className="cursor-pointer" />
                                        <p className="text-nowrap">{field.value} km</p>
                                    </div>

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
                                <FormLabel className="">Tipo de propiedad</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}  >
                                        <SelectTrigger className="w-full" >
                                            <SelectValue placeholder="Tipo de Propiedad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                (propertyTypes)
                                                    ? propertyTypes.map(property => (
                                                        <SelectItem key={property.id} value={property.name} className="capitalize">{property.name}</SelectItem>
                                                    ))
                                                    : <></>
                                            }
                                            <SelectItem key={'key_property_type'} value="all">Todas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="period"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Periodo de facturación</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}  >
                                        <SelectTrigger className="w-full" >
                                            <SelectValue placeholder="Periodo de facturación" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                (periods)
                                                    ? periods.map(period => (
                                                        <SelectItem key={period.id} value={period.name} className="capitalize">{period.name}</SelectItem>
                                                    ))
                                                    : <></>
                                            }
                                            <SelectItem value="all">Todos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="minPrice"
                        render={({ field }) => (
                            <FormItem className="space-y-0 items-center gap-1">
                                <FormLabel className="text-nowrap">Precio Mínimo</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" placeholder="minPrice" className="min-w-20 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-number-spin-box]:hidden" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="maxPrice"
                        render={({ field }) => (
                            <FormItem className="space-y-0 items-center gap-1">
                                <FormLabel className="text-nowrap">Precio Máximo</FormLabel>
                                <FormControl>
                                    <Input type="number"{...field} placeholder="Precio máximo" className="min-w-20 [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-number-spin-box]:hidden" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="self-end mt-6">Guardar</Button>
                </form>
            </Form>
        </div>
    )
}









