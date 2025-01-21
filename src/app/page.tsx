import { getGoogleMapsApikey } from "@/actions/get-google-map-apikey";
import GoogleMap from "./components/GoogleMap";




export default async function Home() {
  return (
    <div className="grid grid-cols-6 w-full h-full border">
      <GoogleMap apikey={await getGoogleMapsApikey()} zoom={15} position={{ lat: 5.522021951991912, lng: -73.36101758384783 }} markable={true}  isForUser={true} />
    </div>
  );
}
