'use client';

import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { Image } from "@/interfaces/image/image.interface";
import { AxiosResponse } from "axios";


interface AdImagesFiles{ 
    main ?: FileList | null;
    ad_image_1 ?: FileList | null;
    ad_image_2 ?: FileList | null;
    ad_image_3 ?: FileList | null;
    ad_image_4 ?: FileList | null;
    ad_image_5 ?: FileList | null;
    ad_image_6 ?: FileList | null;
}


const updateAdImages = async(adId:string, images:AdImagesFiles, token:string)=>{
    console.log('AdId: ------->', adId)
    let rs: AxiosResponse<null |Image[]  | GenericErrorResponse>;
        try {

            const formData = new FormData();
            const filtreredImages = Object.entries(images).filter( ([,v])=> (v != null && v != undefined  && v?.length != 0) )
            if(filtreredImages.length == 0) return null;

            filtreredImages.forEach( ([filename, fileList]) =>{
                console.log('Datos:', {[filename]:fileList})
                const file = fileList[0] as File;
                formData.append(filename, file, filename)
            });

            rs = await apiClient.instance.post(`ad-images/${adId}`, formData,
                {
                    headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                    }
    
                })
            return rs;
        } catch (e) {
            return e as AxiosResponse<GenericErrorResponse>;
        }
} 



export {
    updateAdImages
}