import { auth } from "@/auth";
import { NavBar } from "./components/navbar/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdCard } from "./components/adds/AdCard";
import { getMainAdds } from "@/actions/ads/get-main-adds.action";
import { MainAd } from "@/interfaces/adds/main-adds.interface";
//import { FilterForm } from "./components/filter-form/FilterForm";
import { FilterMenu } from "./components/filter-menu/FilterMenu";


export const dynamicParams = true

//type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }
  | {
    range: number;
    lat: number;
    lng: number;
    offset: number;
    limit: number;
    maxPrice: number;
    minPrice: number;
    propertyType:string;
  }>

interface HomeProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: HomeProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await auth();
  const queryParams = await searchParams;
  console.log({ query: queryParams.range })


  //TODO: obtener la ubicacion y mandarla por defecto
  const adds = await getMainAdds({ ...{ lat:40.60562365, lng:-74.0554853141819, range:25, propertyType:'Casa'}, ...queryParams })
  return (

    <ScrollArea
      className="w-full h-dvh overflow-x-hidden pr-1.5 sm:pr-2.5 transition-all duration-100"
      type="auto"
      scrollHideDelay={100}
      scrollAreaThumbStyle="bg-primary/70 sm:bg-primary/90 dark:bg-primary/50 w-1.5 sm:w-2.5"
      scrollAreaScrollbarStyle="bg-slate-950/10 rounded-full dark:bg-orange-300/10 w-1.5 sm:w-2.5"
    >
      <NavBar />
      <div className="grid grid-cols-12  w-full bg-background relative py-2 ">

        <FilterMenu />

        <div className="grid grid-cols-12 col-span-12 overflow-x-hidden px-4 sm:p-4 gap-y-3 gap-2 py-4 rounded-xl" > 
       {
            adds.status && (adds.data as MainAd[]).length > 0 
            ? (adds.data as MainAd[]).map(ad => (
              <AdCard
                key={ ad.id}
                className="col-span-12 sm:mx-10 md:mx-0 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xl:col-start-5 xl:col-span-8 "
                adData={ ad }
              />
            )) : <div className="">No hay anuncios disponibles </div>
        }
        </div>

        
      </div>
    </ScrollArea>

  );
}




          
          {/* <pre className="w-full">
            {JSON.stringify(session?.user.data, null, 3)}
          </pre>

          <pre className="w-full">
            {JSON.stringify(adds.data, null, 3)}
          </pre> */}

          {/* <Link href={'?lat=40.60562365&lng=-74.0554853141819&range=10000&propertyType=Apartamento'} >Ir a </Link> */}







{/*    <Link href={"/auth/login"} className="bg-blue-600 p-2 rounded-b-md" >Login</Link>
      <Link href={"/auth/register"} className="bg-blue-600 p-2 rounded-t-md" >Register</Link> */}

{/*         {(session?.user) ? <SignOutButton /> : <></>} */ }