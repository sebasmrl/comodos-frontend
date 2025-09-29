import Link from "next/link";
import { redirect } from "next/navigation";

import { getOneAdComplete } from "@/actions/ads/get-one-ad-complete";
import { Card, CardContent } from "@/components/ui/card";
import { AdWithUser } from "@/interfaces/ads/ads.interface";
import { ClientPhotoView } from "./ClientPhotoView";

import { CiLocationOn, CiMapPin } from "react-icons/ci";
import { RiContactsBook3Fill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaBath, FaBed, FaPhone, FaRegBuilding, FaWhatsapp } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { TbFlameFilled, TbFlameOff, TbParkingCircle, TbParkingCircleFilled, TbSofa, TbSofaOff, TbToolsKitchen2, TbToolsKitchen2Off } from "react-icons/tb";
import { MdBathtub, MdNetworkWifi, MdOutlineLiving, MdOutlineZoomOutMap, MdSignalWifiConnectedNoInternet0 } from "react-icons/md";

import { FavoriteAdButton } from "@/app/components/ads/FavoriteAdButton";
import { toLegiblePriceFormat, toUpperCamelCase } from "@/lib/custom/string";
import { GoogleMapV2 } from "@/app/components/maps/GoogleMapV2";

import { dateToESFormat } from "@/utils/date-transformer";
import { ShowMoreText } from "@/app/components/generics/ShowMoreText";
import { AdFeature } from "@/app/components/ads/AdFeature";
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";
import { IoWater, IoWaterOutline } from "react-icons/io5";
import { IoIosArrowForward, IoIosPricetag } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "@/app/components/footer/Footer";


const CLOUDFRONT_URL = process.env.AWS_CLOUDFRONT_DOMAIN ?? '';


export default async function AnuncioPage({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;
    const adRs = await getOneAdComplete(id);
    if (adRs.status != 200) redirect('/');

    const ad = adRs.data as AdWithUser;
    const isExpiredAd = new Date(ad.expiredDate).getTime() < Date.now();


    return (
        <div className="px-0 pt-2 w-full">
            <Card className="flex w-full shadow-none p-0 border-none px-4">
                <CardContent className="grid grid-cols-12 p-1 sm:p-2 rounded-lg gap-6  w-full ">
                    <div className="col-span-12 flex flex-row text-sm sm:text-base text-slate-500 gap-1 items-center font-normal sm:font-thin justify-between sm:justify-start sm:gap-4">
                        <div className="flex gap-1 items-center">
                            <p>{ad.locationCountry}</p>
                            <IoIosArrowForward className="text-primary" />
                            <p>{ad.locationState}</p>
                            <IoIosArrowForward className="text-primary" />
                            <p>{ad.locationCity}</p>
                        </div>
                        <Badge
                            className=""
                            variant={isExpiredAd ? 'destructive' : 'success'}
                        >
                            {isExpiredAd ? 'Caducado' : 'Vigente'}
                        </Badge>
                    </div>

                    <section className="relative col-span-12 lg:col-span-8 flex flex-col  rounded-lg p-0 m-0 gap-2">
                        <ClientPhotoView
                            className="rounded-lg overflow-hidden"
                            domainimages={CLOUDFRONT_URL} ad={ad}
                        />

                        <div className="absolute border-none shadow-none right-2 top-3 flex flex-row gap-1 sm:gap-2 max-w-fit border z-20 border-black">
                            <Button className="text-black dark:text-white bg-slate-200/60 dark:bg-slate-600/60 dark:hover:bg-background " variant={'ghost'}>{ad.propertyType.name}</Button>
                            <FavoriteAdButton className="bg-transparent border-none shadow-none" id={ad.id} />
                        </div>

                        <div className="flex justify-between sm:px-2 gap-2">
                            <div className="">
                                <h1 className="font-bold text-xl sm:text-2xl text-wrap">{ad.name}</h1>
                                <div className="flex items-center hover:rounded-md text-foreground sm:px-1">
                                    <CiMapPin />
                                    <p className="px-1 text-sm md:text-lg font-light text-gray-700 dark:text-inherit text-wrap">{ad.address}, <span>{ad.locationCity}</span></p>
                                </div>
                            </div>

                            <div className="flex self-start sm:self-center">
                                <p className="text-lg sm:text-2xl md:text-3xl font-bold text-primary/80 dark:text-primary text-end">${toLegiblePriceFormat(ad.price)} <span className="font-light">{ad.currency}</span><span className="font-light"> / {ad.period.name}</span></p>
                            </div>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between sm:items-center ">
                            <Link href={`/perfil/${ad.user.id}`}>
                                <div className="flex items-center hover:rounded-md hover:bg-primary/5 p-2 px-4  shadow-sm rounded-md m-1 gap-2 " >
                                    <div className="overflow-hidden aspect-square w-12 h-12 max-w-20 max-h-20 rounded-full">
                                        <Avatar className="h-full w-full">
                                            <AvatarImage src={ad.user?.profileImage ? `${CLOUDFRONT_URL}/${ad.user.profileImage.key}` : ''} />
                                            <AvatarFallback>{`${ad.user.names.substring(0, 1)}${ad.user.lastnames.substring(0, 1)}`}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 "><span>{toUpperCamelCase(`${ad.user.names.split(' ')[0]} ${ad.user.lastnames.split(' ')[0]}`)}</span></p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{ ad.user.isRealStateCompany ? 'Inmobiliaria' : 'Arrendador'}</p>
                                    </div>
                                </div>
                            </Link>
                            <p className="gap-0 flex flex-col ">
                                <span className="self-end font-semibold text-sm sm:text-base text-end">
                                    Última actulización
                                </span>
                                <span className="font-thin text-sm sm:text-base text-end self-end">
                                    {dateToESFormat(new Date(ad.updatedAt))}
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-col min-h-20 border border-border px-4 py-4 bg-accent rounded-md mt-2 gap-0">
                            <h2 className="font-bold text-foreground">Descripción</h2>
                            <ShowMoreText text={ad.description} maxLength={400} />
                        </div>

                        <div id="feautures" className="flex flex-col mt-4 gap-2">
                            <h2 className="font-bold text-primary ">Características</h2>
                            <div className="flex gap-2 flex-wrap">
                                <AdFeature
                                    icon={<MdOutlineZoomOutMap className="w-6" />}
                                    text={`${ad.squareMeters} m2`}
                                />
                                <AdFeature
                                    icon={<FaRegBuilding className="w-6" />}
                                    text={`Piso ${ad.floors}`}
                                />
                                <AdFeature
                                    icon={<FaBed className="w-6" />}
                                    text={`${ad.rooms} Habitaciones`}
                                />
                                <AdFeature
                                    icon={<SiLevelsdotfyi className="w-6" />}
                                    text={`${(ad.stratum.toLowerCase().split(' ').includes('estrato') ? '' : 'Estrato ')}${ad.stratum}`}
                                />
                                <AdFeature
                                    icon={<MdOutlineLiving className="w-6" />}
                                    text={ad.livingRoom ? 'Tiene Sala' : 'No tiene sala'}
                                />
                                <AdFeature
                                    icon={<FaBath className="w-6" />}
                                    text={ad.bathrooms > 1 ? `${ad.bathrooms} Baños` : `${ad.bathrooms} Baño`}
                                />
                                <AdFeature
                                    icon={<MdBathtub className="w-6" />}
                                    text={ad.isSharedBathroom ? 'Baño compartido' : 'Baño independiente'}
                                />

                                {ad.hasKitchen ?
                                    <AdFeature
                                        icon={<TbToolsKitchen2 className="w-6" />}
                                        text={ad.isSharedKitchen ? 'Cocina compartida' : 'Cocina independiente'}
                                    />
                                    :
                                    <AdFeature
                                        icon={<TbToolsKitchen2Off className="w-6" />}
                                        text="Sin cocina"
                                    />
                                }
                                <AdFeature
                                    icon={ad.furnished ? <TbSofa className="w-6" /> : <TbSofaOff className="w-6" />}
                                    text={ad.furnished ? 'Amoblado' : 'No amoblado'}
                                />

                                <AdFeature
                                    icon={<TbParkingCircle className="w-6" />}
                                    text={ad.motoParking ? 'Tiene moto parqueadero' : 'Sin moto parqueadero'}
                                />
                                <AdFeature
                                    icon={<TbParkingCircleFilled className="w-6" />}
                                    text={ad.carParking ? 'Tiene auto parqueadero' : 'Sin auto parqueadero'}
                                />
                                <AdFeature
                                    icon={<PiPlantFill className="w-6" />}
                                    text={ad.yard ? 'Tiene Jardín' : 'No tiene Jardín'}
                                />
                                 {
                                    ad.administrationCost &&
                                    <AdFeature
                                        icon={ <IoIosPricetag   className="w-6" /> }
                                        text={ `Administración: $${toLegiblePriceFormat(ad.administrationCost)}` }
                                    />
                                }

                            </div>

                        </div>

                        <div id="services" className="flex flex-col mt-4 gap-1 ">
                            <h2 className="font-bold text-emerald-600 dark:text-emerald-500">Servicios</h2>
                            <p className="text-sm text-pretty">Los servicos no son necesariamente incluidos en el monto publicado, se refiere unicamente a contar con el mismo</p>
                            <div className="flex gap-2 flex-wrap pt-2">
                                <AdFeature
                                    icon={ad.hasElectricLightService ? <LuLightbulb className="w-6" /> : <LuLightbulbOff />}
                                    text={ad.hasElectricLightService ? 'Eléctricidad' : 'Sin eléctricidad'}
                                />
                                <AdFeature
                                    icon={ad.hasWaterService ? <IoWater className="w-6" /> : <IoWaterOutline />}
                                    text={ad.hasWaterService ? 'Servicio de agua' : 'Sin servicio de agua'}
                                />
                                <AdFeature
                                    icon={ad.hasGasService ? <TbFlameFilled className="w-6" /> : <TbFlameOff />}
                                    text={ad.hasGasService ? 'Servicio de gas' : 'Sin servicio de gas'}
                                />
                                <AdFeature
                                    icon={ad.hasInternetServiceIntegrated ? <MdNetworkWifi className="w-6" /> : <MdSignalWifiConnectedNoInternet0 />}
                                    text={ad.hasInternetServiceIntegrated ? 'Con internet' : 'Sin intenet'}
                                />
                               
                            </div>
                        </div>





                    </section>

                    <section className="col-span-12 lg:col-span-4 flex flex-col max-h-fit pb-4 gap-6 ">

                        <div className="flex flex-col border border-border rounded-lg px-2 py-2 shadow-md">
                            <div className="flex flex-nowrap flex-row  gap-1 p-2 items-center text-rose-600" >
                                <CiLocationOn height={100} width={160} className="w-5 h-5" />
                                <h2 className="text-xl font-semibold">Ubicación</h2>
                            </div>
                            <GoogleMapV2
                                initialCoords={ad.coords}
                                initialZoom={16}
                                staticMarker
                                saveButtonAvailable={false}
                                className="h-[60vh]"
                                classNameMap="h-full"
                                classNameInput="hidden"
                                classNameInputDiv="hidden"
                            />
                        </div>

                        <div className="flex flex-col border border-border rounded-lg px-2 py-2 shadow-md">
                            <div className="flex flex-nowrap flex-row  gap-1 items-center text-blue-600 p-2" >
                                <RiContactsBook3Fill height={100} width={100} className="w-5 h-5" />
                                <h2 className="text-xl font-semibold">Contacto</h2>
                            </div>
                            <div className="pt-2 pb-4 px-2 text-sm md:text-base">
                                <p className="text-blue-800 dark:text-blue-600">
                                    <strong>¡</strong>Parece que te ha llamado la atención este anuncio<strong>!</strong>
                                </p>
                                <p className="">
                                    Contactate ahora con el anunciante y afina los detalles que necesites.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`https://wa.me/+${ad.phoneCode}${ad.phone}`} className="rounded-md w-full h-9 text-center  bg-green-500 p-1 text-white hover:bg-green-600" passHref target="_blank">
                                    <FaWhatsapp className="w-full h-full p-1" />
                                </Link>
                                <Link href={`tel:+${ad.user.phoneCode}${ad.phone}`} className="rounded-md bg-gray-300 p-1 text-gray-700 hover:text-gray-800 w-full h-9" passHref target="_blank">
                                    <FaPhone className="w-full h-full p-1" />
                                </Link>
                            </div>
                            <div className=" flex pt-2 pb-4 px-2 gap-1">
                                <BsInfoCircleFill className="h-8 w-8 text-blue-400" />
                                <p className="text-pretty text-xs">
                                    La información que intercambies a traves de estos canales estan enteramente bajo tu responsabilidad y la del anunciante, <strong>comodos.co</strong> no se hace acreedor de conflictos legales relacionados.
                                </p>
                            </div>
                        </div>
                    </section>

                </CardContent>
            </Card>
            <div className="relative pt-16 bg-gradient-to-t  from-slate-600/80 via-slate-500/30  dark:from-orange-600/20 to-transparent">
                <Footer className="bg-transparent dark:bg-transparent bottom-0 " />
            </div>
        </div >
    );
}






