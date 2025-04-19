import { CreateAdForm } from "@/app/components/adds/forms/CreateAdForm";

export default function NuevoAnuncioPage() {
  return (
    <div >
      <h1 className="text-center p-4 font-thin text-xl md:text-2xl text-accent-foreground drop-shadow-sm">Nuevo Anuncio</h1>
      <CreateAdForm className=""/>
    </div>
  );
}