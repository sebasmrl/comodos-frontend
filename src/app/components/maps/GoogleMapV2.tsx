'use client';

import { DragEvent, useEffect, useRef, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader'
import { Input } from "@/components/ui/input";

export const GoogleMapV2 = () => {

  const [location, setLocation] = useState<{ lat: number, lng: number }>({ lat: 40.60562365, lng: -74.0554853141819 });
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    const initMap = async () => {
      const loader = await new Loader({
        apiKey: process.env.GOOGLE_MAPS_API_KEY ?? 'AIzaSyAy91L31p8l5Mp3XSzf9rgOme40tF95cG8',
        version: 'quarterly',
        libraries: ['places']
      });

      const { Map } = await loader.importLibrary('maps');

      const options: google.maps.MapOptions = {
        center: location,
        zoom: 13,
        mapId: 'map',
        controlSize: 25,
        colorScheme: 'DARK',
        mapTypeControl: false,
      }

      const { AdvancedMarkerElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

      const map = new Map(mapRef.current as HTMLElement, options);
      const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current as HTMLInputElement, {})
      
      //new google.maps.places.PlaceAutocompleteElement({})
      autocomplete.addListener("place_changed", () => {
        // Obtener el lugar seleccionado
        const place = autocomplete.getPlace();

        // Validar si el lugar tiene geometría
        if (!place.geometry || !place.geometry.location) {
          console.log("No se encontraron detalles de ubicación.");
          return;
        }

        const coords = {
          lat: place.geometry?.location?.lat() ?? 0,
          lng: place.geometry?.location?.lng() ?? 0
        }
        console.log("Lugar seleccionado:", coords);
        map.setZoom(25)
        setLocation(coords);


      });


      const marker = new AdvancedMarkerElement({
        position: location,
        map: map,
        title: 'lugar',
        gmpDraggable: true
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      marker.addListener('dragend', (event: DragEvent) => {
        //const position = marker.position as google.maps.LatLng;
      });


    }

    initMap();

    return () => { }
  }, [location])


  return (
    <div className="p-1 w-full">
      <div className="w-full pb-3">
        <Input ref={autocompleteRef} className="w-full px-4 py-2 rounded-md min-w-24 z-50" autoComplete="off" />
      </div>
      <div ref={mapRef} className="w-80 h-80 "></div>
    </div>
  )
}
