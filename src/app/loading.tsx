import { ScrollArea } from "@/components/ui/scroll-area";
import { NavBar } from "./components/navbar/NavBar";
import { FilterMenu } from "./components/filter-menu/FilterMenu";
import { getGoogleMapsApikey } from "@/actions/get-google-map-apikey";

export default async function Loading() {
    const googleApiKey = await getGoogleMapsApikey();
    return (

        <ScrollArea
            className="w-full h-dvh overflow-x-hidden  transition-all duration-100" //pr-1.5 sm:pr-2.5
            type="auto"
            scrollHideDelay={100}
            scrollAreaThumbStyle="bg-primary/70 sm:bg-primary/90 dark:bg-primary/50 w-1.5 sm:w-2.5"
            scrollAreaScrollbarStyle="bg-slate-950/10 rounded-full dark:bg-orange-300/10 w-1.5 sm:w-2.5"
        >
            <NavBar />
            <div className="grid grid-cols-12 w-full bg-background relative py-2 ">

                <FilterMenu googleApiKey={googleApiKey} />
                {/*  <div className="grid grid-cols-12 col-span-12 overflow-x-hidden px-4 sm:p-4 gap-y-3 gap-2 py-4 rounded-xl" >   </div> */}
            </div>
            <div className="flex flex-col items-center justify-center h-full min-h-full text-gray-700 mt-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600 mb-4"></div>
                <p className="text-lg font-semibold">Cargando, por favor espera...</p>
            </div>
        </ScrollArea>

    );
}