import { Metadata } from "next";
import { NavBar } from "../components/navbar/NavBar"
import { GoogleMapWrapperForUbicacion } from "./GoogleMapWrapperForUbicacion";
import { auth } from "@/auth";
import { getUserCoordsAction } from "@/actions/user/get-user-coords.action";
import { Coords } from "@/interfaces/coords.interface";

export const metadata: Metadata = {
    title: 'Ubicación',
    description: 'Selecciona la ubicación en el mapa para encontrar los anuncios de inmuebles cercanos a tu locacion',
    authors: [{ name: 'Sebastian Morales', url: 'https://sebastianmorales.dev' }]
  }
  

export default async function UbicacionPage() {

    const session = await auth();
    let userCoords = { lat:0, lng:0}
    if(session){
       const rs = await getUserCoordsAction(session.user.data.backendTokens.accessToken);
       if(rs.status == 200){
            userCoords = rs.data as Coords;
       }
    }

    return (
        <div className="w-full h-full flex flex-col min-h-full">
            <NavBar className="fixed" />
            <div className="w-full min-h-full flex-shrink-[2] h-dvh"> {/* w-full min-h-full flex-shrink-[2] h-[calc(100vh-4.5rem)]"> */}
                <GoogleMapWrapperForUbicacion userCoords={userCoords} />
            </div>
        </div>
    );
}
