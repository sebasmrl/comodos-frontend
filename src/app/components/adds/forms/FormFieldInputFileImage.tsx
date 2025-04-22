'use client';

import Image from "next/image";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createAdFormSchema } from "./create-ad-form-schema";
import { z } from "zod";
import { LuImageUp } from "react-icons/lu";


interface Props {
    form: UseFormReturn<z.infer<typeof createAdFormSchema>>,
    name: FieldPath<z.infer<typeof createAdFormSchema>>;
    labelText: string;
    style?: {
        div?: string;
        input?: string
        image?: string;
        label?: string;
    };
}

//TODO: Pendiente restriccion de Input para solo admitir imagenes
export const FormFieldInputFileImage = ({ form, name, labelText, style }: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ }) => {
                return (
                    <FormItem className="space-y-0 items-center gap-1" >
                        <FormControl >
                            <div className={cn("relative rounded-sm overflow-hidden  flex justify-center shadow-sm border border-slate-900/5 dark:border-slate-300/10", style?.div)}>
                                <Input type={'file'} className={cn("min-w-20 min-h-30 w-full h-full z-20 bg-transparent text-transparent text-center absolute top-0 opacity-0 hover:bg-primary/60 hover:opacity-30 cursor-pointer p-2 transition-colors", style?.input)} {...form.register(name)} />

                                <div className="overflow-hidden w-full h-full flex justify-center items-center min-h-32 max-h-36 sm:min-h-40 sm:max-h-44">
                                    {
                                    
                                    getUrlImage({ fileList: form.watch(name) as FileList })
                                    ?
                                    <Image
                                        src={getUrlImage({ fileList: form.watch(name) as FileList }) ?? ''}
                                        alt={""}
                                        width={100}
                                        height={100}
                                        className={cn("w-full h-auto min-h-20 scale-150 ", style?.image)}
                                    />
                                    :<LuImageUp className={cn("w-full h-auto min-h-10 max-h-12 text-secondary-foreground ", style?.image)} />
                                    }
                                </div>
                                <p className={cn("absolute bottom-2 right-4 bg-primary rounded-full text-white px-2", style?.label)}>{labelText}</p>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    )
}


const getUrlImage = ({ fileList }: { fileList: FileList }): string | null => {
    try {
        //This error is controlled in URL.createObjectURL function
        const value = URL.createObjectURL(fileList.item(0) ?? new Blob([]));
        return (value != '') ? value: null;;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return null;
    }
}
