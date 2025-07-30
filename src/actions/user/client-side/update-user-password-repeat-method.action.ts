import { apiClient } from "@/config/axios-client.config";
import { GenericErrorResponse } from "@/interfaces";
import { UpdateUserPasswordByRepeatMethod } from "@/interfaces/user/update-user-password-by-repeat-method.interface";
import {  AxiosError, AxiosResponse } from "axios";



interface UpdateUserPasswordByRepeatMethodArgs{
    data:UpdateUserPasswordByRepeatMethod;
    token:string;
}

const updateUserPasswordByRepeatMethod = async({ data,  token}:UpdateUserPasswordByRepeatMethodArgs) =>{
     let rs: AxiosResponse<boolean | GenericErrorResponse>;
        try {
            rs = await apiClient.instance.patch(`users/password/repeat-method`, data,
                {
                    
                    headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                    }
    
                })
            return rs
        } catch (e) {
            return (e as AxiosError).response as AxiosResponse<GenericErrorResponse>
        }
}



export {
    updateUserPasswordByRepeatMethod
}