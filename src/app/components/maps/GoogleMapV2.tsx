'use client';

import { DragEvent, useEffect, useRef, useState } from "react";
import { Loader } from '@googlemaps/js-api-loader'
import { Input } from "@/components/ui/input";
import { getGoogleMapsApikey } from "@/actions/get-google-map-apikey";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { IoIosSave } from "react-icons/io";
import { BackButton } from "@/app/components/back-button/BackButton";



interface Props {
  className?: string;
  classNameMap?: string;
  classNameInput?: string;
  classNameInputDiv?: string;
}

export const GoogleMapV2 = ({ className, classNameInput, classNameMap, classNameInputDiv }: Props) => {

  const [initialLocation, setInitialLocation] = useState<{ lat: number, lng: number }>({"lat":4.570868,"lng":-74.297333});
  const [location, setLocation] = useState<{ lat: number, lng: number }>({"lat":4.570868,"lng":-74.297333});

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const theme = useTheme();

  useEffect(() => {

    const initMap = async () => {

      const apikey = await getGoogleMapsApikey();

      const loader = await new Loader({
        apiKey: apikey ?? '',
        version: 'quarterly',
        libraries: ['places']
      });

      const { Map } = await loader.importLibrary('maps');

      const options: google.maps.MapOptions = {
        center: initialLocation,
        zoom: 16,
        mapId: 'map',
        controlSize: 25,
        colorScheme: theme.theme?.toUpperCase(),
        mapTypeControl: true,
        mapTypeControlOptions:{ position: google.maps.ControlPosition.BOTTOM_CENTER },
        zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
        streetViewControl:false,
      }

      const { AdvancedMarkerElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

      const map = new Map(mapRef.current as HTMLElement, options);
      const autocomplete = new google.maps.places.Autocomplete(autocompleteRef.current as HTMLInputElement, {})

      //Creacion del marcardor
      const marker = new AdvancedMarkerElement({
        position: map.getCenter(),
        map: map,
        title: 'Ubicación de consulta',
        gmpDraggable: true,
      })


      // ----------------------- Events ----------------------------------
      const placeChangedEvent = autocomplete.addListener("place_changed", () => {
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

        map.setZoom(18)
        marker.position = coords;
        map.setCenter(coords);
        setInitialLocation(coords)
        setLocation(coords);
      });


      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const markerDragedEvent = marker.addListener('dragend', (event: DragEvent) => {
        const position = marker.position as google.maps.LatLngLiteral;
        if(position) setLocation({lat:position.lat, lng:position.lng})
      });
      
      const markerClickEvent = marker.addListener("click", () => {
        map.setZoom(18);
        map.setCenter(marker.position as google.maps.LatLng);
      });


      const mapClickEvent = map.addListener('click', (e:google.maps.MapMouseEvent)=>{
        const data = {
          lat: e?.latLng?.lat() ?? map.getCenter()?.lat() ?? initialLocation.lat,
          lng: e?.latLng?.lng() ?? map.getCenter()?.lng() ?? initialLocation.lng
        }
        marker.position = data;
        /* setTimeout(() => {
          if(map && marker) map.setCenter(data);
        }, 600);     */    
        setLocation(data);

      });

      return { placeChangedEvent,markerClickEvent, markerDragedEvent, mapClickEvent};
    }


    const mapEvents = initMap();

    //Destroy
    return () => {
      mapEvents.then( events =>{
        const { placeChangedEvent,markerClickEvent, markerDragedEvent, mapClickEvent} = events;
        placeChangedEvent.remove();
        markerClickEvent.remove();
        markerDragedEvent.remove();
        mapClickEvent.remove();
      })
     }    
  }, [initialLocation, theme])


  return (
    <div className={cn("p-1 w-full h-full", className)}>
      <div className={cn("pb-2 w-full", classNameInputDiv)}>
        <Input ref={autocompleteRef} className={cn("w-full px-4 py-2 rounded-md min-w-24 z-50", classNameInput)} autoComplete="off" />
      </div>
      <div ref={mapRef} className={cn("min-w-80 min-h-80 w-full h-[90%] rounded-md", classNameMap)}></div>
      <BackButton className="rounded-full w-12 h-12 absolute right-8 bottom-6 "
      actionCallback={ async()=>{
        alert("Guardando en estado global y en DB"+JSON.stringify(location))
        //TODO: Insertar ubicacion en ESTADO y en DB si esta logueado
      }}
      >
        <IoIosSave className="h-full w-full" />
      </BackButton>
    </div>
  )
}
