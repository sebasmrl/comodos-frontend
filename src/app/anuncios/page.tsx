
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAdsByUserId } from "@/actions/ads/get-ads-by-userid";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Comodos - Mis Anuncios',
  description: 'Gestiona tus anuncios',
  authors: [{ name: 'Sebastian Morales', url: 'https://sebastianmorales.dev' }]
}

//ver listado de anuncios de una

export default async function AnunciosPage() {

  const session = await auth();
  if (!(session?.user)) redirect('/auth/login');

  //TODO: obtener todos los anuncios del usuario logueado y mostrarle opciones CRUD
  const ads = await getAdsByUserId(session.user.data.id ?? '');

  return (
    <div>
      <h1>Anuncios Page</h1>
      <Link href={'/anuncios/nuevo'}><Button> Nuevo Anuncio</Button></Link>
      <pre>
        { JSON.stringify(ads.data, null, 3)}
      </pre>
    </div>
  );
}