
'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyAdsContainer() {

  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-96 border border-dashed border-primary/70 dark:border-primary/50 rounded-xl bg-orange-50 dark:bg-orange-900/5 p-6 text-center m-2">
      <h2 className="text-2xl font-semibold text-primary  mb-2">
          No has publicado ningún anuncio
        </h2>
        <p className="text-sm text-primary dark:text-foreground  mb-6">
          Empieza a atraer interesados creando tu primer anuncio de forma rápida y sencilla.
        </p>
      <Button 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
        onClick={()=> router.push('anuncios/nuevo')}
      >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Crear anuncio
        </Button>
    </div>
  );
}