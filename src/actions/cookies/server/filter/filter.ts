'use server';

import { SearchParams, SearchParamsPromise } from "@/interfaces/search-params.type";
import { cookies } from "next/headers";


export const getSearchParamsAction = async( ):SearchParamsPromise =>{
        const cookieStore = await cookies();
        const searchParams:SearchParams = JSON.parse(  cookieStore.get('filter-ads')?.value ?? '{}');
        return searchParams;
}