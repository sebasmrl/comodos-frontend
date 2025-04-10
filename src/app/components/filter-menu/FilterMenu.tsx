'use client';

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TfiMapAlt } from "react-icons/tfi";
import { TbFilterPin } from "react-icons/tb";
import { FilterForm } from "../filter-form/FilterForm";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface Props{
  googleApiKey:string;
}

export function FilterMenu({}:Props) {

    const [open, setOpen] = useState(false);
    const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false} >
      <SheetTrigger asChild >
        <Button variant="default" className="rounded-full w-12 h-12 fixed bottom-4 right-4 z-40"><TbFilterPin  className="min-h-full min-w-full"/></Button>
      </SheetTrigger>
      <SheetContent side={'right'} className=" overflow-y-auto z-50 w-[300px] md:w-[450px]" onClick={ (e)=>{ e.stopPropagation()}}>
        <SheetHeader className="pb-4">
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Elige las opciones de tu preferencia y encuentra el inmueble más se acomode a tus necesidades.
          </SheetDescription>
        </SheetHeader>
            <div className="p-0 m-0">
              <Button onClick={()=>{
                router.push('/ubicacion');
              }} className="w-full bg-emerald-700 text-primary-foreground shadow hover:bg-emarald-700/90"><TfiMapAlt />Ir al mapa </Button>
            </div>
            <FilterForm onOpenAndCloseDialog={setOpen}/>
      </SheetContent>
    </Sheet>
  )
}
