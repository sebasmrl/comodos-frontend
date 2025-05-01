'use client';

import { getAllPropertyTypesFromClient } from '@/actions/property-types/client/get-all-property-types';
import { customSonnerToast } from '@/app/components/custom-sonner-toast/customSonnerToast';
import { PropertyType } from '@/interfaces/property-types/property-type.interface';
import { useEffect, useState } from 'react';

const usePropertyTypes = () => {

    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
    const [isLoadingPropertyTypes, setIsLoadingPropertyTypes] = useState<boolean>(false);
    //const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPropertyTypes = async () => {
                try{
                    setIsLoadingPropertyTypes(true)
                    const rs = await getAllPropertyTypesFromClient() ;
                    setPropertyTypes(rs.data as PropertyType[])
                }catch(e){
                    customSonnerToast({ title:'Error al  traer tipos de propiedad', description:`${e}`, variant:'destructive'})
                }finally{
                    setIsLoadingPropertyTypes(false)
                }
        }
        getPropertyTypes()
    }, [])

    return { propertyTypes, isLoadingPropertyTypes };
}

export default usePropertyTypes;