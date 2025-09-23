export type SearchParams = {
    [key: string]: string | string[] | number | undefined
}
    |
{
    range: number;
    lat: number;
    lng: number;
    page ?: number;
    //offset: number;
    //limit: number;
    maxPrice: number;
    minPrice: number;
    propertyType: string;
    period:string;
    type:string;
}
export type SearchParamsPromise = Promise<SearchParams>