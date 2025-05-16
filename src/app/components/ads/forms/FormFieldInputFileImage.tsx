'use client';

import Image from "next/image";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createAdFormSchema } from "./schemas/create-ad-form-schema";
import { z } from "zod";
import { LuImageUp } from "react-icons/lu";
import { getUrlImageFromFileList } from "@/utils/get-url-image-from-filelist";


interface Props {
    form: UseFormReturn<z.infer<typeof createAdFormSchema>>,
    name: FieldPath<z.infer<typeof createAdFormSchema>>;
    labelText: string;
    imageUrl?:string | null;
    style?: {
        div?: string;
        input?: string
        image?: string;
        label?: string;
    };
}

export const FormFieldInputFileImage = ({ form, name, labelText, imageUrl, style }: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ }) => {
                return (
                    <FormItem className="space-y-0 items-center gap-1" >
                        <FormControl >
                            <div className={cn("min-h-36 max-h-36 sm:min-w-30 sm:min-h-30 relative rounded-sm overflow-hidden  flex justify-center shadow-sm border border-slate-900/5 dark:border-slate-300/10", style?.div)}>
                                <Input type={'file'} accept="image/jpg, image/png, image/jpeg, image/webp, image/svg, image/svg+xml" className={cn("min-h-36 max-h-36 sm:min-w-30 sm:min-h-30 w-full h-full z-20 bg-transparent text-transparent text-center absolute top-0 opacity-0 hover:bg-primary/60 hover:opacity-30 cursor-pointer p-2 transition-colors overflow-hidden rounded-sm", style?.input)} {...form.register(name)} />

                                <div className="overflow-hidden w-full h-full flex justify-center items-center min-h-36 max-h-36 ">
                                    {
                                    
                                    getUrlImageFromFileList({ fileList: form.watch(name) as FileList })
                                    ?
                                    <Image
                                        src={getUrlImageFromFileList({ fileList: form.watch(name) as FileList }) ?? ''}
                                        alt={""}
                                        width={100}
                                        height={100}
                                        className={cn("w-full h-auto min-h-20 scale-150 ", style?.image)}
                                    />
                                    :  imageUrl
                                    ?
                                    <Image
                                        src={ `${imageUrl}?time=${Date.now()}`}
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



