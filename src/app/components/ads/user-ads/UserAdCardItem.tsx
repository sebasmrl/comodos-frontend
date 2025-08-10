
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Ad } from "@/interfaces/ads/ads.interface"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { HTMLAttributes } from "react"
import { CiMapPin, CiTimer } from "react-icons/ci"
import { FaEdit, FaEye } from "react-icons/fa"
import { MdDelete, MdOutlineImageNotSupported } from "react-icons/md"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { getTimePeriodInDays } from "@/utils/time-period.util"
import { RenewalAdButton } from "./RenewalAdButton"
import { DeleteAdButton } from "./DeleteAdButton"


interface Props extends HTMLAttributes<HTMLElement> {
  ad: Ad
  baseUrl: string | null;
}



export const UserAdCardItem = ({ ad, className, baseUrl }: Props) => {

  const adImageKey = ad.images.filter(img => img.fieldName == 'main')[0]?.key;
  const isExpiredAd = new Date(ad.expiredDate).getTime() < Date.now();

  return (
    <Card className={cn("min-h-36 py-4 relative", className)}>
      <CardContent className="flex m-0 max-h-48 min-h-36  pb-0 px-4 border-none gap-x-3">

        <div className="min-h-full min-w-36 w-52 flex-grow-[1] max-w-52 aspect-video overflow-hidden flex justify-center items-center  rounded-md border border-border hover:bg-slate-500/10 dark:hover:bg-slate-100/10 transition-colors">
          {
            ((baseUrl && adImageKey)) ?
              <Image
                src={(baseUrl && adImageKey) ? `${baseUrl}/${adImageKey}?v=${Date.now()}` : '/svgs/no-data.svg'}
                alt={"imagen del anuncio"}
                width={300}
                height={300}
                style={{ 'width': 'auto' }}
                className="scale-150 h-full object-cover"
                priority
              />
              : <div className="w-auto h-full flex justify-center items-center">
                <MdOutlineImageNotSupported width={100} height={100} className="h-8 w-8 " />
              </div>
          }
        </div>


        <div className="flex flex-col flex-grow-[3] pl-2 justify-center gap-1">
          <h3 className="font-semibold text-lg leading-tight max-w-[90%] sm:max-w-full">{ad.name}</h3>
          <div className="flex items-center hover:rounded-md  text-foreground">
            <CiMapPin />
            <p className="px-1 text-sm font-light text-gray-700 dark:text-inherit">
              {ad.address}, <span>{ad.locationCity}</span>
            </p>
          </div>

          <div className="flex items-center hover:rounded-md  text-foreground">
            <CiTimer />
            <p className="px-1 text-sm font-light text-gray-700 dark:text-inherit">
              {
                isExpiredAd
                  ? `Caducó hace ${getTimePeriodInDays(new Date(ad.expiredDate), new Date())} dias`
                  : `Vence en ${getTimePeriodInDays(new Date(ad.expiredDate), new Date())} dias`
              }
            </p>
          </div>


          <Badge
            className="self-start md:mt-1"
            variant={isExpiredAd ? 'destructive' : 'success'}
          >
            {isExpiredAd ? 'Caducado' : 'Vigente'}
          </Badge>
        </div>


        <ul className="hidden lg:flex gap-1 items-center justify-end">
          <li className=" border-border border rounded-md bg-gray-600 text-white p-2 font-medium text-sm m-0 hover:bg-gray-500  transition-colors">
            <Link href={`/anuncios/${ad.id}`} className="min-w-16 inline-flex justify-center items-center gap-2"><FaEye /> <p>Ver</p></Link>
          </li>
          <li className=" border-border border rounded-md bg-blue-600  text-white text-sm font-medium p-2 hover:bg-blue-500  transition-colors">
            <Link href={`/anuncios/editar/${ad.id}`} className="min-w-10 inline-flex justify-center items-center gap-2"><FaEdit /> <p>Editar</p></Link>
          </li>
          <li className="p-0 m-0">
            <Button className="text-xs sm:text-sm inline-flex items-center gap-2 p-2 min-w-10" variant={'destructive'}><MdDelete /> <p>Eliminar</p> </Button>
          </li>
        </ul>
      </CardContent>

      <CardFooter className="pb-0 pt-4 m-0 lg:hidden">
        <ul className="flex w-full gap-1 md:items-center lg:hidden justify-center">
          <li className=" border-border border rounded-md bg-gray-600 text-white p-2 font-medium text-sm m-0">
            <Link href={`/anuncios/${ad.id}`} className="inline-flex items-center gap-2 "><FaEye /> <p>Ver</p></Link>
          </li>
          <li className=" border-border border rounded-md bg-blue-600 text-white text-sm font-medium p-2">
            <Link href={`/anuncios/editar/${ad.id}`} className="inline-flex items-center gap-2"><FaEdit /> <p>Editar</p></Link>
          </li>
          <li className="p-0 m-0">
           <DeleteAdButton adId={ad.id} key={`deleteBtn-${ad.id}`} />
          </li>
        </ul>
      </CardFooter>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="absolute top-1 right-1 rounded-full w-10 h-10 hover:bg-accent p-0">
            <RenewalAdButton adId={ad.id} key={ad.id}  />
          </TooltipTrigger>
          <TooltipContent className="bg-slate-600">
            <p>Renovar anuncio</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </Card>
  )
}
