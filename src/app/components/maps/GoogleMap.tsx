'use client';

//import { insertMapPositionToAd, insertMapPositionToUser } from "@/actions/insert-map-position-action";
import { APIProvider, ColorScheme, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface Props {
  apikey: string;
  zoom?: number;
  position?: {
    lat: number,
    lng: number
  },
  markable?: boolean;
  onSave?: ( position: {lat:number,lng:number}) => void; //onSave?: (e: React.MouseEvent<HTMLButtonElement>)=>void
  //isForUser?: boolean 
}



export default function GoogleMap({
  apikey,
  zoom = 5,
  position = { lat: 5.3420606, lng: -72.6211212 },
  markable = false,
  onSave
  //isForUser = false,
}: Props) {

  const [markerPosition, setMarkerPosition] = useState(position);
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (!marker) {
      return;
    }
    marker.setPosition(markerPosition)
  }, [marker, markerPosition]);



  return (
    <div className="col-span-6 sm:col-span-2 sm:col-start-3  ">
      <APIProvider apiKey={apikey}>
        <Map
          className="h-96 rounded-md"
          defaultCenter={markerPosition}
          defaultZoom={zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          controlSize={25}
          colorScheme={ColorScheme.DARK}

          onClick={(e) => {
            if(markable) {
              setMarkerPosition({
                lat: e.detail.latLng?.lat ?? 0,
                lng: e.detail.latLng?.lng ?? 0
              })
              //if (isForUser) { insertMapPositionToUser(markerPosition) } 
             // else { insertMapPositionToAd(markerPosition); }
              if(onSave) onSave(markerPosition)
            }
          }}
        >
          {
            markable || position
              ? <Marker ref={markerRef} position={{ lat: markerPosition.lat, lng: markerPosition.lng }} />
              : <></>
          }
        </Map>
      </APIProvider>
      <div>
          
      </div>
    </div>
  );
}


//usage example
//<GoogleMap apikey={await getGoogleMapsApikey()} zoom={15} position={{ lat: 5.522021951991912, lng: -73.36101758384783 }} markable={true}  isForUser={true} />

