import React from 'react';

const TermsAndConditions = () => {
    return (
        <section className="my-4 max-w-4xl mx-auto px-6 py-12 bg-accent rounded-md shadow-lg text-foreground">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">Términos y Condiciones</h1>

            <p className="text-sm text-center text-gray-500 mb-10">
                Última actualización: 6 de agosto de 2025
            </p>

            <div className="space-y-8 text-base leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">1. Aceptación de los Términos</h2>
                    <p>
                        Al acceder o utilizar la plataforma <strong>comodos.co</strong>, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo, por favor abstente de utilizar nuestros servicios.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">2. Descripción del Servicio</h2>
                    <p>
                        Comodos (comodos.co) permite a los usuarios publicar, buscar y contactar arrendadores de inmuebles. Los anuncios pueden incluir diferentes tipos de propiedades, períodos de facturación (diario, mensual, etc.), filtros por precio y ubicación basada en coordenadas geográficas.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">3. Registro de Usuario</h2>
                    <p>
                        Para acceder a ciertas funciones, debes registrarte con información verídica. Eres responsable de la seguridad de tu cuenta y del uso que se haga desde la misma.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">4. Publicación de Inmuebles</h2>
                    <p>
                        Al publicar un inmueble en comodos.co, confirmas que tienes autorización para hacerlo. Los datos del anuncio deben ser precisos y estar actualizados, incluyendo el tipo de propiedad, precio, disponibilidad, ubicación y demás características relevantes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">5. Imágenes de Inmuebles</h2>
                    <p>
                        Comodos permite a los usuarios subir imágenes de los inmuebles ofrecidos. Al subir contenido visual:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Garantizas que tienes los derechos legales sobre las imágenes.</li>
                        <li>Aceptas que las imágenes se muestren públicamente en la plataforma.</li>
                        <li>No deben contener información falsa, ofensiva ni elementos que infrinjan derechos de terceros.</li>
                        <li>Nos reservamos el derecho de eliminar imágenes que violen estos términos o nuestras políticas de contenido.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">6. Ubicación y Geolocalización</h2>
                    <p>
                        Comodos utiliza datos de coordenadas para mostrar inmuebles cercanos a una ubicación seleccionada por el usuario. Esta funcionalidad mejora los resultados de búsqueda y no implica la obtención automática de tu ubicación sin tu consentimiento.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">12. Publicidad</h2>
                    <p>
                        Comodos.co puede mostrar anuncios de terceros, como Google Ads, dentro de la plataforma. Estos anuncios pueden estar basados en tus intereses, actividad de navegación y otros datos según se describe en nuestra Política de Cookies.
                    </p>
                </section>


                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">7. Contenido Prohibido</h2>
                    <p>
                        No se permite publicar anuncios o imágenes que:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Sean ofensivos, fraudulentos o ilegales.</li>
                        <li>Infrinjan derechos de autor o marcas registradas.</li>
                        <li>Incluyan datos personales sin autorización.</li>
                    </ul>
                    <p className="mt-2">
                        Comodos se reserva el derecho de eliminar contenido y suspender cuentas que incumplan estas normas.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">8. Responsabilidad</h2>
                    <p>
                        Comodos actúa únicamente como plataforma de conexión entre arrendadores y arrendatarios. No intervenimos ni garantizamos los acuerdos entre partes, y no asumimos responsabilidad por conflictos, pagos o incumplimientos relacionados con los contratos de arriendo.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">9. Modificaciones</h2>
                    <p>
                        Podemos modificar estos términos en cualquier momento. Los cambios serán publicados en esta página. El uso continuado de la plataforma después de dichos cambios implica tu aceptación de los mismos.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">10. Legislación Aplicable</h2>
                    <p>
                        Estos Términos y Condiciones se rigen por la legislación colombiana. Cualquier controversia será resuelta ante los tribunales competentes de Colombia.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">11. Contacto</h2>
                    <p>
                        Si tienes dudas sobre estos términos o deseas reportar un uso indebido de la plataforma, contáctanos a través del correo oficial (disponible proximamente), por lo cual, te comprometes esperar hasta que dispongamos de él.
                    </p>
                </section>
            </div>
        </section>
    );
};

export default TermsAndConditions;
