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
import { useQueryParams } from "@/hooks/use-query-params";
  



interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    name?: string;
    onOpenAndCloseDialog: (v:boolean)=>void
}

const formSchema = z.object({
    propertyType: z.string().min(2, {
        message: "El tipo de propiedad debe ser uno válido",
    }),
    range: z.array(z.number()),
    minPrice: z.string().refine((val) => !isNaN(Number(val)), { message: "Debe ser un número válido" }) // Validar string numérico
            .transform((val) => Number(val)), // Transformar a número
    maxPrice: z.string().refine((val) => !isNaN(Number(val)), { message: "Debe ser un número válido" }) // Validar string numérico
            .transform((val) => Number(val)), // Transformar a número
})

export const FilterForm = ({ className, onOpenAndCloseDialog, ...props }: Props) => {

    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyType: "",
            range:[0],
            minPrice: 0,
            maxPrice: 1
        },
    });

    const router= useRouter();
    const params = useQueryParams();
    console.log({params})

    

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        onOpenAndCloseDialog(false);
        const options = {...values, range: values?.range[1], ...params }
        console.log({options    })

        //TODO: realizar la peticion basada en url segun los datos del formulario de filtro
        router.push(''); 
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
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} name={field.name}  >
                                        <SelectTrigger className="w-full" >
                                            <SelectValue placeholder="Tipo de Propiedad"/>
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
                        name="maxPrice"
                        render={({ field }) => (
                            <FormItem className="space-y-0  items-center gap-x-1">
                                <FormLabel className="text-nowrap">Precio Máximo</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="maxPrice" className="min-w-20"/>
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
                                    <Input {...field} placeholder="minPrice" className="min-w-20"/>
                                </FormControl>   
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="page"
                        render={({ field }) => (
                            <FormItem className="space-y-0 items-center inline-flex gap-1">
                                <FormLabel className="text-nowrap">Precio Mínimo</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="page" className="min-w-20"/>
                                </FormControl>   
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    
                    <Button type="submit" className="self-end mt-6">Guardar</Button>
                </form>
            </Form>
        </div>
    )
}









