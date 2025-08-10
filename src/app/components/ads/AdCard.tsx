
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { CLOUDFRONT_URL } from "@/config/env";
import { MainAd } from "@/interfaces/ads/main-ads.interface";
import { toLegiblePriceFormat } from "@/lib/custom/string";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CiMapPin } from "react-icons/ci";
import { FaBath, FaBed } from 'react-icons/fa';
import { MdOutlineZoomOutMap } from "react-icons/md";
import { TbSofa, TbSofaOff } from "react-icons/tb";
import { FavoriteAdButton } from "./FavoriteAdButton";
import { Ad } from "@/interfaces/ads/ads.interface";
import { getDistanceBetween2Coords } from "@/utils";
import { Coords } from "@/interfaces/coords.interface";

interface Props {
  className?: string | undefined;
  adData: MainAd
}

export function AdCard({ className, adData }: Props) {



  return (
    <Card key={adData.id} className={cn(" border-border bg-background  after:bg-slate-200 after:shadow-lg after:-z-10 after:blur-sm after:saturate-150 after:w-full after:h-full after:scale-150 dark:shadow-orange-950/40 dark:hover:border-orange-950/80  hover:border-primary/30 transition-color duration-200 cursor-pointer", className)}> {/*  border-border bg-background shadow-md hover:shadow-lg dark:shadow-orange-950/40 dark:hover:border-orange-950/80  hover:border-primary/60 transition-color duration-200 cursor-pointer */}
      <CardContent className="py-4 px-4 ">
        <Link href={`/anuncios/${adData.id}`} passHref legacyBehavior>
          <div className=" rounded overflow-hidden w-full grid grid-cols-1 sm:grid-cols-3 "> {/* max-w-sm */}
            <div className="col-span-3 sm:col-span-1 aspect-video w-full h-full rounded-lg overflow-hidden flex justify-center items-center">
              <Image width={200} height={200} className="aspect-video w-full h-auto scale-125 hover:scale-150 duration-300 transition-transform" src={`${CLOUDFRONT_URL}/${adData.images.find(val => val.fieldName = 'main')?.key}?v=${Date.now()}`} alt="Property Image" />
            </div>

            {/* Informacion */}
            <div className=" px-2 sm:px-6 py-2 col-span-3 sm:col-span-2 relative ">
              <div className="mb-2">
                <h2 className="text-xl sm:text-2xl leading-8  font-bold text-foreground capitalize">{adData.name}</h2>
                <div className="flex items-center hover:rounded-md  text-foreground">
                  <CiMapPin />
                  <p className="px-1 text-sm font-light text-gray-700 dark:text-inherit text-nowrap">{adData.address}, <span>{adData.location_city}</span></p>
                </div>
                <div className="flex items-center pt-2">
                  <div className="mr-2 rounded-full bg-blue-600 py-1 px-2 text-xs font-medium text-white">{adData.property_type}</div>
                  <div className="rounded-full bg-yellow-500 py-1 px-2 text-xs font-medium text-white">{adData?.distance?.toFixed(2)} Km</div>
                </div>
                <FavoriteAdButton className="absolute border-none shadow-none right-2 sm:top-2 top-2" id={adData.id} />
              </div>

              <div className="flex justify-between sm:justify-start md:justify-start flex-wrap">
                <div className="inline-flex items-center hover:rounded-md hover:bg-slate-300 p-2 dark:hover:text-secondary text-foreground">
                  <FaBed className="w-6 p-0 m-0 " />
                  <p className="ml-2 text-xs font-medium text-gray-700 dark:text-inherit text-nowrap">{adData.rooms} Habitaciones</p>
                </div>
                <div className="flex items-center hover:rounded-md hover:bg-slate-300 p-2 dark:hover:text-secondary text-foreground">
                  <FaBath className="w-6" />
                  <p className="ml-2 text-xs font-medium text-gray-700 dark:text-inherit text-nowrap">{adData.bathrooms} Baños</p>
                </div>
                <div className="flex items-center hover:rounded-md hover:bg-slate-300 p-2 dark:hover:text-secondary text-foreground">
                  {adData.furnished ? <TbSofa className="w-6" /> : <TbSofaOff className="w-6" />}
                  <p className="ml-2 text-xs font-medium text-gray-700 dark:text-inherit text-nowrap">{adData.furnished ? 'Amoblado' : 'No amoblado'}</p>
                </div>
                <div className="flex items-center hover:rounded-md hover:bg-slate-300 p-2 dark:hover:text-secondary text-foreground">
                  <MdOutlineZoomOutMap className="w-6" />
                  <p className="ml-2 text-xs font-medium text-gray-700 dark:text-inherit text-nowrap">{adData.square_meters} m2</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-primary/80 dark:text-primary">${toLegiblePriceFormat(adData.price)} <span className="font-light">{adData.currency}</span><span className="font-light"> / {adData.period}</span></p>
              </div>
            </div>
          </div>
        </Link>
      </CardContent >
    </Card >
  )
}


export function reformatAdDataToProfile(ad: Ad, currentCoords: Coords):MainAd{
  return ({
    id: ad.id,
    name: ad.name,
    coords: ad.coords,
    address: ad.address,
    location_city: ad.locationCity,
    furnished: ad.furnished,
    price: ad.price,
    currency: ad.currency,
    rooms: ad.rooms,
    bathrooms: ad.bathrooms,
    square_meters: ad.squareMeters,
    period: ad.period.name,
    property_type: ad.propertyType.name,
    distance: getDistanceBetween2Coords(ad.coords, currentCoords),
    images: ad.images,
    updated_ad: ad.updatedAt
  });
};