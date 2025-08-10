'use client';
import 'react-photo-view/dist/react-photo-view.css';

import { AdWithUser } from "@/interfaces/ads/ads.interface";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props  extends React.HTMLAttributes<HTMLDivElement>{
    domainimages: string;
    ad: AdWithUser;
    carouselClassName?: React.HTMLAttributes<HTMLElement>
}
export const ClientPhotoView = ({ domainimages, ad, className, carouselClassName }: Props) => {
    return (
        <PhotoProvider
            speed={() => 300}
           /*  easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')} */
        >

            <div className={cn('flex w-full max-w-full p-0 h-auto aspect-video rounded-lg ', className)}>

                <Carousel className={cn("flex flex-col w-full h-auto aspect-video overflow-hidden rounded-lg p-0",carouselClassName)}>
                    <CarouselContent  className='flex h-auto w-full p-0 gap-2 m-0 '>
                        {ad.images.map((image, index) => (
                            <CarouselItem key={index*index} className='flex h-auto w-full p-0 aspect-video m-0' >
                                    <Card className='w-full  h-auto aspect-video p-0 border-none shadow-none '>
                                        <CardContent className="flex w-full h-auto aspect-video gap-2 p-0  ">
                                            <div className=" w-full h-auto aspect-video overflow-hidden">
                                                {/* <Image width={200} height={200} className="aspect-video w-full h-auto scale-125 hover:scale-150 duration-300 transition-transform" src={`${domainimages}/${ad.key}`} alt="Imagen de anuncio" /> */}
                                                <PhotoView key={index} src={`${domainimages}/${image.key}?v=${new Date(ad.updateAt).getTime()}`} height={900} width={900} >
                                                    <Image 
                                                        src={`${domainimages}/${image.key}?v=${new Date(ad.updateAt).getTime()}`} 
                                                        alt="" 
                                                        width={900} 
                                                        height={900} 
                                                        style={{ objectFit: 'cover', cursor:'zoom-in' }} 
                                                        className='w-full h-auto rounded-lg aspect-video'
                                                    />
                                                </PhotoView>
                                            </div>
                                        </CardContent>
                                    </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious  className='absolute top-[51%] left-1 sm:left-4 z-20'/>
                    <CarouselNext className='absolute top-[51%] right-1 sm:right-4 z-20'/>
                </Carousel>
            </div>
        </PhotoProvider>
    )
}



{/* <div className="">
                {ads.images.map((image, index) => (
                    <PhotoView key={index} src={`${domainimages}/${image.key}`}>
                        <Image style={{ objectFit: 'cover' }} src={`${domainimages}/${image.key}`} alt=""  width={100} height={100}/>
                    </PhotoView>
                ))}
            </div> */}
