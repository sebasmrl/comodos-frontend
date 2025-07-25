import { auth } from "@/auth";
import { NavBar } from "./components/navbar/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdCard } from "./components/ads/AdCard";
import { getMainAds } from "@/actions/ads/get-main-ads.action";
import { MainAd } from "@/interfaces/ads/main-ads.interface";
import { FilterMenu } from "./components/filter-menu/FilterMenu";
import Image from "next/image";
import { getGoogleMapsApikey } from "@/actions/maps/get-google-map-apikey";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { SearchParamsPromise } from "@/interfaces/search-params.type";
import { getFilterAdsCookiesAction } from "@/actions/cookies/server/filter/filter";
import { GoToMapButton } from "./components/maps/GoToMapButton";
import { Footer } from "./components/footer/Footer";
import Link from "next/link";
import { PaginationAds } from "./components/pagination/PaginationAds";



export const dynamicParams = true
//export const dynamic = "force-dynamic";

//type Params = Promise<{ slug: string }>


interface HomeProps {
  searchParams: SearchParamsPromise;
}

export default async function Home({ searchParams }: HomeProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await auth();
  const filterCookies = await getFilterAdsCookiesAction();

  const { page, ...queryParams } = await searchParams;

  let limit = 10, offset = 0;
  if (page != undefined && !isNaN(Number(page)) && Number(page) > 0) {
    limit = 10 * Number(page);
    offset = limit - 10;
  }

  const ads = await getMainAds({ ...{ lat: 40.60562365, lng: -74.0554853141819 }, ...filterCookies, ...queryParams, limit, offset });
  const googleApiKey = await getGoogleMapsApikey() ?? '';


  return (

    <ScrollArea
      className="w-full h-dvh overflow-x-hidden  transition-all duration-100" //pr-1.5 sm:pr-2.5
      type="auto"
      scrollHideDelay={100}
      scrollAreaThumbStyle="bg-primary/70 sm:bg-primary/90 dark:bg-primary/50 w-1.5 sm:w-2.5"
      scrollAreaScrollbarStyle="bg-slate-950/10 rounded-full dark:bg-orange-300/10 w-1.5 sm:w-2.5"
    >
      <NavBar />
      <div className="grid grid-cols-12 w-full bg-background relative ">

        <FilterMenu googleApiKey={googleApiKey} />



        {/*  Hero */}
        <section className="bg-orange-50 dark:bg-orange-950 py-20 col-span-12 w-full flex flex-col">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-foreground mb-4">Encuentra el lugar perfecto para vivir</h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">Explora arriendos en tu ciudad con facilidad y confianza. Filtra por ubicación, precio y más.</p>
            <div className="flex justify-center gap-4">
              <div className="p-0 m-0">
                <GoToMapButton className="p-6 text-xl" iconClassName="min-w-6 min-h-6" />
              </div>
            </div>
          </div>
        </section>



        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12",
            "opacity-40"
          )}
        />

        <div className="grid grid-cols-12 col-span-12 overflow-x-hidden px-4 gap-y-4 gap-2 py-8 sm:py-8 rounded-xl" >
          {
            ads.status != 400 && (ads.data as MainAd[])?.length > 0
              ? (ads.data as MainAd[]).map(ad => (
                <AdCard
                  key={ad.id}
                  className="col-span-12 sm:mx-10 md:mx-0 md:col-start-2 md:col-span-10 xl:col-start-3 xl:col-span-8" //col-span-12 sm:mx-10 md:mx-0 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xl:col-start-5 xl:col-span-8
                  adData={ad}
                />
              )) : <div
                className="flex  flex-col col-span-12 min-h-full rounded-md justify-center items-center gap-2 py-10 px-5 ">
                <span className=" text-center font-medium text-xl bg-clip-text text-transparent bg-slate-900  dark:bg-primary">No hay anuncios disponibles para los filtros seleccionados</span>
                <span className=" text-center font-light italic text-sm text-slate-600 dark:text-slate-400">Selecciona nuevos filtros para encontrar algún inmueble</span>
                <Image src={"/svgs/no-data.svg"} priority alt={"imagen alusiva a sin resultados"} width={400} height={400} className="mt-8 h-auto" />
              </div>
          }
          <PaginationAds
            className="col-span-12 pt-5"
            currentPage={(offset == 0) ? 1 : Number(page)}
            existAds={ads.status != 400 && (ads.data as MainAd[])?.length > 0}
          />
        </div>


        {/* Features */}
        {
          (offset == 0) 
            ? < section className="py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 col-span-12" >
                <div className="text-center">
                  <div className="text-orange-500 text-4xl mb-4">🏠</div>
                  <h3 className="font-semibold text-lg mb-2">Variedad de propiedades</h3>
                  <p className="text-gray-600">Apartamentos, casas, estudios y más. Encuentra lo que se ajusta a ti.</p>
                </div>
                <div className="text-center">
                  <div className="text-orange-500 text-4xl mb-4">🔎</div>
                  <h3 className="font-semibold text-lg mb-2">Búsqueda inteligente</h3>
                  <p className="text-gray-600">Filtros avanzados para que solo veas lo que realmente te interesa.</p>
                </div>
                <div className="text-center">
                  <div className="text-orange-500 text-4xl mb-4">📱</div>
                  <h3 className="font-semibold text-lg mb-2">100% móvil</h3>
                  <p className="text-gray-600">Busca desde tu celular con nuestra interfaz optimizada.</p>
                </div>
              </section>
            : <></>
        }


        {/* CTA */}
        {
          (offset == 0)
            ? <section className="bg-primary text-white text-center py-16 col-span-12">
                <h2 className="text-3xl font-bold mb-4">¿Tienes un inmueble para alquilar?</h2>
                <p className="mb-6">Publica gratis y encuentra inquilinos rápidamente.</p>
                <Link href="/anuncios/nuevo" className="bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">Publicar ahora</Link>
              </section>
            : <></>
        }



        <Footer className="col-span-12" />

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

{/* <Link href={'?lat=40.60562365&lng=-74.0554853141819&range=10000&propertyType=Apartamento'} >Ir a </Link> */ }







{/*    <Link href={"/auth/login"} className="bg-blue-600 p-2 rounded-b-md" >Login</Link>
      <Link href={"/auth/register"} className="bg-blue-600 p-2 rounded-t-md" >Register</Link> */}

{/*         {(session?.user) ? <SignOutButton /> : <></>} */ }