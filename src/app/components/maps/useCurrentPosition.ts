'use client';

import { useState, useEffect } from 'react';
import { Coords } from './../../../interfaces/coords.interface';

interface Props{
    autorefresh?:boolean;
}

export const useCurrentPosition = ({ autorefresh=false }:Props) => {
    const [location, setLocation] = useState<Coords>({ lat: 4.570868, lng:  -74.297333 });
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(location)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const refreshCondition = (autorefresh==false) 
                                                ? location.lat ==0 && location.lng ==0 
                                                : true
                    if ( refreshCondition && (position.coords.latitude != location.lat || position.coords.longitude != location.lng ) ) {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    }
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                (error) => {
                    setError("No se pudo obtener la ubicación del usuario");
                }
            );
        } else {
            setError("El navegador no soporta geolocalización");
        }
    }, [location, autorefresh]); // Solo se ejecuta al montar el componente

    return { location, error };
};
