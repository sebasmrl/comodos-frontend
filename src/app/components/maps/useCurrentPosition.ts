'use client';

import { useState, useEffect } from 'react';
import { Coords } from './../../../interfaces/coords.interface';

interface Props{
    autorefresh?:boolean;
    defaultValues?: Coords
}


export const useCurrentPosition = ({ autorefresh=false, defaultValues = {lat: 4.657757999999999, lng: -74.0941234   } }:Props) => {
    const [location, setLocation] = useState<Coords>( defaultValues);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log(location)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const refreshCondition = (autorefresh==false) 
                                                ? location.lat ==defaultValues.lat && location.lng ==defaultValues.lng 
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
    }, [location, autorefresh, defaultValues]); // Solo se ejecuta al montar el componente

    return { location, error };
};
