import { getAllAdPeriodsFromClientSide } from "@/actions/periods/client/get-all-ad-periods";
import { AdPeriod } from "@/interfaces/ad-period/ad-period.interface";
import { create } from "zustand";

type State = {
    periods: AdPeriod[];
}

type Action = {
    fetchPeriods: () => Promise<void>;  
}


export const usePeriodsStore = create<State & Action>( (set)=>({
    periods: [],
    fetchPeriods: async()=>{
        try {
            const rs = await getAllAdPeriodsFromClientSide();
            set({periods: rs.data as AdPeriod[]})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
        }
    }
}))