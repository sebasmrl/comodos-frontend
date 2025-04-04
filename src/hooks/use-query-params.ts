import { useSearchParams } from "next/navigation";

export const useQueryParams = ()=>{
    const params = useSearchParams();
   
    return params.entries().toArray().reduce( (acumulate, [k,v] ) => {
        acumulate[k] = v
        return acumulate;
    }, {} as Record<string, string>)
}
