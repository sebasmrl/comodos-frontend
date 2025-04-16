
import { auth } from "@/auth";
import { redirect } from "next/navigation";

//ver listado de anuncios de una

export default async function AnunciosPage() {

    const session = await auth();
    if(!(session?.user)) redirect('/auth/login');
    
    //TODO: obtener todos los anuncios del usuario logueado y mostrarle opciones CRUD

  return (
    <div>
      <h1>Anuncios Page</h1>
    </div>
  );
}