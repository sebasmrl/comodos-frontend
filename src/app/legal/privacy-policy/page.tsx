import React from 'react';

const PrivacyPolicy = () => {
    return (
        <section className="my-4 max-w-4xl mx-auto px-6 py-12 bg-accent rounded-md shadow-sm text-foreground">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-primary">Política de Privacidad</h1>

            <p className="text-sm text-gray-500 text-center mb-10">
                Última actualización: 6 de agosto de 2025
            </p>

            <div className="space-y-8 text-base leading-relaxed">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">1. Responsable del Tratamiento</h2>
                    <p>
                        En <strong>Comodos</strong> (comodos.co), nos comprometemos a proteger tu privacidad. Somos responsables del tratamiento de tus datos personales según la legislación vigente.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">2. Datos que Recopilamos</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>N° Documento Nacional de Identidad (DNI)</li>
                        <li>Nombre completo</li>
                        <li>Correo electrónico</li>
                        <li>Contraseña (encriptada)</li>
                        <li>Fecha de nacimiento</li>
                        <li>Nacionalidad</li>
                        <li>Género</li>
                        <li>Número de teléfono</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">3. Finalidades del Tratamiento</h2>
                    <p>
                        Usamos tus datos para gestionar tu cuenta, autenticar tu acceso, validar tu identidad y enviarte notificaciones relevantes relacionadas con el uso de la plataforma.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">4. Base Legal</h2>
                    <p>
                        El tratamiento se realiza con base en tu consentimiento, de acuerdo con la Ley 1581 de 2012 (Colombia).
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">5. Compartición de Datos</h2>
                    <p>
                        No compartimos tus datos con terceros, salvo proveedores de servicios que nos ayudan a operar la app, y bajo acuerdos de confidencialidad.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">6. Conservación de los Datos</h2>
                    <p>
                        Conservamos tus datos mientras mantengas una cuenta activa o mientras sea requerido para cumplir con obligaciones legales.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">7. Seguridad</h2>
                    <p>
                        Aplicamos medidas técnicas y organizativas para proteger tus datos contra el acceso no autorizado, pérdida o modificación.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">8. Tus Derechos</h2>
                    <p>
                        Puedes acceder, corregir, eliminar o revocar el consentimiento sobre tus datos escribiéndonos a los canales oficiales indicados en la plataforma.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">9. Cambios a Esta Política</h2>
                    <p>
                        Nos reservamos el derecho de actualizar esta política. Te notificaremos cualquier cambio significativo a través de la app o por correo electrónico.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2 text-primary">10. Contacto</h2>
                    <p className='whitespace-pre-line'>
                        {
                            `Para preguntas o solicitudes sobre tus datos personales, contáctanos mediante los canales de soporte en comodos.co.
                            Estos estarán disponibles próximamente cuando podamos habilitarlos, por lo cual, te comprometes esperar hasta que dispongamos de ellos.`
                        }
                    </p>
                </div>
            </div>
        </section>
    );
}

export default PrivacyPolicy;
