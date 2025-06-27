'use server';

import { SearchParams, SearchParamsPromise } from "@/interfaces/search-params.type";
import { cookies } from "next/headers";


export const getFilterAdsCookiesAction = async( ):SearchParamsPromise =>{
        const cookieStore = await cookies();
        const searchParams:SearchParams = JSON.parse(  cookieStore.get('filter-ads')?.value ?? '{}');
        return searchParams;
}