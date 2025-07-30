import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse, UploadProfileImageResponse } from "@/interfaces";
import {  AxiosError, AxiosResponse } from "axios";



interface UpdateProfileImageArgs{
    token:string;
    data: File;
}

const updateProfileImage = async({ data,  token}:UpdateProfileImageArgs) =>{
     let rs: AxiosResponse<UploadProfileImageResponse | GenericErrorResponse>;

        const formData = new FormData();
        formData.append('profile_image', data)
        try {
            rs = await apiClient.instance.post(`user-images`, formData,
                {
                    
                    headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                    }
    
                })
            return rs
        } catch (e) {
            return (e as AxiosError).response as AxiosResponse<GenericErrorResponse>
        }
}



export {
    updateProfileImage
}