import { Metadata } from "next";
import { NavBar } from "../components/navbar/NavBar"
import { GoogleMapWrapperForUbicacion } from "./GoogleMapWrapperForUbicacion";

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
                <GoogleMapWrapperForUbicacion />
            </div>
        </div>
    );
}
