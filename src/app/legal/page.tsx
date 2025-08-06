//import { redirect } from "next/navigation";


import React from 'react';
import Link from 'next/link';
import { Footer } from '../components/footer/Footer';
import { NavBar } from '../components/navbar/NavBar';

const Legal = () => {
  return (
    <div className='min-h-screen m-0 flex flex-col justify-between'>
    <NavBar />
    <main className=" bg-background py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Centro Legal</h1>
        <p className="text-accent-foreground mb-10">
          Aquí puedes consultar nuestras políticas y condiciones legales.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link className="block p-6 bg-white shadow-md rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition"href="/legal/terms" target="_blank">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Términos y Condiciones</h2>
              <p className="text-sm text-gray-600">
                Revisa las reglas para usar comodos.co como arrendador o arrendatario.
              </p>
          </Link>

          <Link className="block p-6 bg-white shadow-md rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition" href="/legal/privacy-policy" target="_blank">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Política de Privacidad</h2>
              <p className="text-sm text-gray-600">
                Conoce cómo recopilamos, usamos y protegemos tus datos personales.
              </p>
          </Link>

          <Link  className="block p-6 bg-white shadow-md rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition" href="/legal/cookies-policy" target="_blank">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Política de Cookies</h2>
              <p className="text-sm text-gray-600">
                Aprende sobre el uso de cookies propias y de terceros como Google Ads.
              </p>
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
};

export default Legal;




/* export default function LegalPage() {
  return redirect('/')
} */