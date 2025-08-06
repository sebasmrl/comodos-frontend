import React from 'react';

const CookiePolicy = () => {
  return (
    <section className="my-4 max-w-4xl mx-auto px-6 py-12 bg-accent rounded-md shadow-md text-foreground">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">Política de Cookies</h1>

      <p className="text-sm text-center text-gray-500 mb-10">
        Última actualización: 6 de agosto de 2025
      </p>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan para recordar tus preferencias, mejorar tu experiencia de usuario y recopilar información sobre tu comportamiento de navegación.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">2. Tipos de cookies que utilizamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cookies necesarias:</strong> Estas cookies son esenciales para el funcionamiento de comodos.co. Permiten la autenticación del usuario, la gestión de la sesión y el correcto funcionamiento del sistema de filtros de búsqueda.
            </li>
            <li>
              <strong>Cookies funcionales:</strong> Nos ayudan a recordar tus preferencias en la plataforma, como ubicaciones recientes o criterios de búsqueda.
            </li>
            <li>
              <strong>Cookies de terceros:</strong> Utilizamos servicios externos como <strong>Google Ads</strong>, que pueden establecer cookies para ofrecerte anuncios relevantes y medir la efectividad de nuestras campañas publicitarias.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">3. Uso de cookies de Google Ads</h2>
          <p>
            Comodos.co puede utilizar cookies de <strong>Google Ads</strong> para mostrarte anuncios personalizados basados en tu historial de navegación y tus interacciones en nuestra plataforma. Estas cookies permiten:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Medir la efectividad de nuestras campañas publicitarias.</li>
            <li>Mostrarte anuncios más relevantes para tus intereses.</li>
            <li>Evitar que veas los mismos anuncios repetidamente.</li>
          </ul>
          <p className="mt-2">
            Para más información sobre cómo Google utiliza las cookies en publicidad, puedes visitar: <a href="https://policies.google.com/technologies/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer nofollow">policies.google.com/technologies/ads</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">4. ¿Cómo puedes gestionar tus cookies?</h2>
          <p>
            Puedes configurar tu navegador para aceptar o rechazar cookies, o para eliminar cookies ya almacenadas. Ten en cuenta que desactivar ciertas cookies puede afectar el funcionamiento de algunas funcionalidades esenciales de comodos.co.
          </p>
          <p className="mt-2">
            También puedes gestionar tus preferencias de anuncios desde la <a href="https://adssettings.google.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer nofollow">configuración de anuncios de Google</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">5. Cambios en esta política</h2>
          <p>
            Comodos.co se reserva el derecho de modificar esta Política de Cookies en cualquier momento. Te notificaremos sobre cambios importantes a través de la plataforma o por correo electrónico.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary mb-2">6. Contacto</h2>
          <p>
            Si tienes dudas sobre esta política o sobre el uso de cookies en comodos.co, puedes contactarnos a través de nuestro correo oficial (disponible proximamente), por lo cual, te comprometes esperar hasta que dispongamos de él.
          </p>
        </section>
      </div>
    </section>
  );
};

export default CookiePolicy;
