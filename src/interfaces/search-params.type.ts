export type SearchParams = {
    [key: string]: string | string[] | undefined
}
    |
{
    range: number;
    lat: number;
    lng: number;
    offset: number;
    limit: number;
    maxPrice: number;
    minPrice: number;
    propertyType: string;
    period:string;
}
export type SearchParamsPromise = Promise<SearchParams>