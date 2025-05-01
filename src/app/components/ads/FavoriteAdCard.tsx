
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { CLOUDFRONT_URL } from "@/config/env";
import { toLegiblePriceFormat, toUpperCamelCase } from "@/lib/custom/string";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CiMapPin } from "react-icons/ci";
import { FaBath, FaBed, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineZoomOutMap } from "react-icons/md";
import { TbSofa, TbSofaOff } from "react-icons/tb";
import { FavoriteAdButton } from "./FavoriteAdButton";
import { Ad } from "@/interfaces/ads";
import { PublicUserProfile } from "@/interfaces/user";
import { getDistanceBetween2Coords } from "@/utils";

interface Props {
  className?: string | undefined;
  adData: Ad;
  publicUserProfile: PublicUserProfile
}

export function FavoriteAdCard({ className, adData, publicUserProfile }: Props) {
  const distance =  getDistanceBetween2Coords({lat: 40.60562365, lng: -74.0554853141819}, adData.coords)

  return (
    <Card key={adData.id} className={cn(" border-border bg-background  after:bg-slate-200 after:shadow-lg after:-z-10 after:blur-sm after:saturate-150 after:w-full after:h-full after:scale-150 dark:shadow-orange-950/40 dark:hover:border-orange-950/80  hover:border-primary/30 transition-color duration-200 cursor-pointer", className)}>
      <CardContent className="py-4 px-4 ">
        <Link href={`/anuncios/${adData.id}`} passHref legacyBehavior>
          <div className=" rounded overflow-hidden w-full grid grid-cols-1 sm:grid-cols-3 "> {/* max-w-sm */}
            <div className="col-span-3 sm:col-span-1 aspect-video w-full h-full rounded-lg overflow-hidden flex justify-center items-center">
              <Image width={200} height={200} className="aspect-video w-full h-auto scale-125 hover:scale-150 duration-300 transition-transform" src={ `${CLOUDFRONT_URL}/${adData.images.find( val => val.fieldName = 'main')?.key}`} alt="Property Image" />
            </div>

            {/* Informacion */}
            <div className=" px-2 sm:px-6 py-2 col-span-3 sm:col-span-2 relative ">
              <div className="mb-2">
                <h2 className="text-xl sm:text-2xl leading-8  font-bold text-foreground capitalize">{adData.name}</h2>
                <div className="flex items-center hover:rounded-md  text-foreground">
                  <CiMapPin />
                  <p className="px-1 text-sm font-light text-gray-700 dark:text-inherit text-nowrap">{adData.address}, <span>{adData.locationCity}</span></p>
                 
                </div>
                <div className="flex items-center pt-2">
                  <div className="mr-2 rounded-full bg-blue-600 py-1 px-2 text-xs font-medium text-white">{adData.propertyType.name}</div>
                  <div className="rounded-full bg-yellow-500 py-1 px-2 text-xs font-medium text-white">{distance?.toFixed(2)} Km</div>
                </div>
                <FavoriteAdButton id={ adData.id}  />
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
                  { adData.furnished ? <TbSofa className="w-6" /> :<TbSofaOff className="w-6"/>}
                  <p className="ml-2 text-xs font-medium text-gray-700 dark:text-inherit text-nowrap">{adData.furnished ? 'Amoblado':'No amoblado'}</p>
                </div>
                <div className="flex items-center hover:rounded-md hover:bg-slate-300 p-2 dark:hover:text-secondary text-foreground">
                  <MdOutlineZoomOutMap className="w-6" />
                  <p className="ml-2 text-xs font-medium text-gray-700 dark:text-inherit text-nowrap">{adData.squareMeters} m2</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-primary/80 dark:text-primary">${toLegiblePriceFormat(adData.price)} <span className="font-light">{adData.currency}</span><span className="font-light"> / {adData.period.name}</span></p>
              </div>
            </div>

            {/* Anunciante y contacto */}
            <div className="sm:px-6 pt-2 flex justify-between items-center col-span-3">
              <Link href={`/usuarios/publico/${publicUserProfile.id}`}>
                <div className="flex items-center hover:rounded-md hover:bg-primary/5 p-2  shadow-sm rounded-md m-1">
                  <Image width={35} height={35} src={ `${CLOUDFRONT_URL}/${publicUserProfile.profileImage.key}` } alt="Imagen de perfil" className="mr-2 rounded-full object-cover " />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100 "><span>{toUpperCamelCase(`${publicUserProfile.names.split(' ')[0]} ${publicUserProfile.lastnames.split(' ')[0]}`)}</span></p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Arrendador</p>
                  </div>
                </div>
              </Link>
              <div className="flex">
                <Link href="tel:+1234567890" className="mr-2 rounded-full bg-gray-300 p-1 text-gray-700 hover:text-gray-800 w-9 h-9" passHref>
                  <FaPhone className="w-full h-full p-1" />
                </Link>
                <Link href="https://wa.me/1234567890" className=" w-9 h-9 text-center align-middle rounded-full bg-green-500 p-1 text-white hover:bg-green-600" passHref>
                  <FaWhatsapp className="w-full h-full p-1" />
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </CardContent >
      {/*     <CardFooter className="flex justify-between">
        footer
      </CardFooter> */}
    </Card >
  )
}
