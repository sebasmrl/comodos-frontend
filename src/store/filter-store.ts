//?? Is possible that never use, better functionality with cookies

import { Coords } from '@/interfaces/coords.interface';
import { create } from 'zustand';

type State = {
    coords:Coords;
    range: number;
    propertyType: string;
    maxPrice: number;
    minPrice:number;
    period: string;
}

type Action = {
    updateCoords: (coords: State['coords']) => void
    updateRange: (range: State['range']) => void
    updatePropertyType: (propertyType: State['propertyType']) => void
    updateMinPrice: (minPrice: State['minPrice']) => void
    updateMaxPrice: (maxPrice: State['maxPrice']) => void
    updatePeriod: (period: State['period']) => void
    updateAll: (data: State) => void
}

export const useFilterStore = create<State & Action>( (set)=>({
    coords: { lat:4.570868, lng:-74.297333},
    range: 10,
    propertyType: 'Casa',
    maxPrice: 100000,
    minPrice: 1,
    period: 'Mes',
    updateCoords: (coords) => {
        set((state)=>({...state, coords}))
    },
    updateRange: (range) => {
        set((state)=>({...state, range}))
    },
    updatePropertyType: (propertyType) => {
        set((state)=>({...state, propertyType}))
    },
    updateMinPrice: (minPrice) => {
        set((state)=>({...state, minPrice }))

    },
    updateMaxPrice: (maxPrice) => {
        set((state)=>({...state, maxPrice}))

    },
    updatePeriod: (period) => {
        set((state)=>({...state, period}))
    },
    updateAll: (data) => {
        set((state)=>({...state, ...data }))
    }
}));