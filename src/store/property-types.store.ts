import { getAllPropertyTypesFromClientSide } from "@/actions/property-types/client/get-all-property-types";
import { PropertyType } from "@/interfaces/property-types/property-type.interface";
import { create } from "zustand";

type State = {
    propertyTypes: PropertyType[];
}

type Action = {
    fetchPropertyTypes: () => Promise<void>;  
}


export const usePropertyTypesStore = create<State & Action>( (set)=>({
    propertyTypes: [],
    fetchPropertyTypes: async()=>{
        try {
            const rs = await getAllPropertyTypesFromClientSide();
            set({propertyTypes: rs.data as PropertyType[]})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
        }
    }
}))