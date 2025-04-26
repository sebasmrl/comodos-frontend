import { Action, toast } from "sonner";



const  Variants = {
    default: {},
    destructive: {
        toast: 'group-[.toaster]:bg-red-600 group-[.toaster]:text-white',
            title: 'font-bold',
            description: 'group-[.toast]:text-slate-200',
            content: 'text-white'
    },
    success: {
        toast: 'group-[.toaster]:bg-emerald-700 group-[.toaster]:text-emerald-100',
            title: 'font-bold',
            description: 'group-[.toast]:text-emerald-200',
            content: 'text-white'
    }
} as const;


type CustomSonnerToastOptions = {
    variant:  keyof typeof Variants;
    title: string;
    description?: string;
    duration?:number;
    action?: Action | React.ReactNode;
}

export const customSonnerToast = (options:CustomSonnerToastOptions) => {

    const selectedVariant = Variants[options.variant]
    
    toast(options.title, {
        classNames: selectedVariant,
        duration: options.duration,
        description: options?.description,
        action: options?.action,
    },)
}

