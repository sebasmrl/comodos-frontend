import { Coords } from "@/interfaces/coords.interface";

export const getDistanceBetween2Coords = (coord1:Coords, coord2: Coords):number=>{
    
        const toRadians = (degree: number) => degree * (Math.PI / 180);
      
        const R = 6371; // Radio de la Tierra en kilómetros
        const dLat = toRadians(coord2.lat - coord1.lat);
        const dLon = toRadians(coord2.lng - coord1.lng);
      
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRadians(coord1.lat)) *
            Math.cos(toRadians(coord2.lat)) *
            Math.sin(dLon / 2) ** 2;
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en kilómetros
}