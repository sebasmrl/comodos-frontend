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
import { TbFilterPin } from "react-icons/tb";
import { FilterForm } from "../filter-form/FilterForm";
import { useState } from "react";
import { GoogleMapV2 } from "../maps/GoogleMapV2";
//import GoogleMap from "../maps/GoogleMap";


interface Props{
  googleApiKey:string;
}

export function FilterMenu({}:Props) {

    const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default" className="rounded-full w-12 h-12 fixed bottom-4 right-4 z-40"><TbFilterPin  className="min-h-full min-w-full"/></Button>
      </SheetTrigger>
      <SheetContent side={'right'} className=" overflow-y-auto z-50">
        <SheetHeader className="pb-4">
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>
            Elige las opciones de tu preferencia y encuentra el inmueble más se acomode a tus necesidades.
          </SheetDescription>
        </SheetHeader>

            <div className="rounded-md ">
              {/* <GoogleMap apikey={googleApiKey} markable/> */}
              <GoogleMapV2 />
            </div>
            <FilterForm onOpenAndCloseDialog={setOpen}/>
      </SheetContent>
    </Sheet>
  )
}
