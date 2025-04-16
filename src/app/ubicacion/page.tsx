import { Metadata } from "next";
import { GoogleMapV2 } from "../components/maps/GoogleMapV2";
import { NavBar } from "../components/navbar/NavBar"

export const metadata: Metadata = {
    title: 'Ubicacion',
    description: 'Selecciona la ubicación en el mapa para encontrar los anuncios de inmuebles cercanos a tu locacion',
    authors: [{ name: 'Sebastian Morales', url: 'https://sebastianmorales.dev' }]
  }
  

export default function UbicacionPage() {
    return (
        <div className="w-full h-full flex flex-col min-h-full">
            <NavBar className="fixed" />
            <div className="w-full min-h-full flex-shrink-[2] h-dvh"> {/* w-full min-h-full flex-shrink-[2] h-[calc(100vh-4.5rem)]"> */}
                <GoogleMapV2  className="h-full p-0" classNameInputDiv="relative p-0" classNameInput="absolute top-20 bg-background w-[80%] right-[10%] xl:w-[50%] xl:right-[25%]" classNameMap="h-full"/>
            </div>
        </div>
    );
}
