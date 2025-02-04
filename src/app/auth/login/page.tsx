import { Metadata } from "next";
import { LoginForm } from "./form/LoginForm";

export const metadata:Metadata = {
  title: 'Comodos - Iniciar Sesión',
  description: 'Inicia sesión con tu cuenta de Comodos y no te pierdas los ultimos inmuebles disponibles en tu zona para arrendamiento',
  keywords: ['iniciar sesion', 'inicia sesion', 'comodos', 'acceder a comodos','iniciar sesion en comodos', 'arriendo', 'arriendo en colombia' ],
  authors: [ { name:'Sebastian Morales', url:'https://sebastianmorales.dev'}],
  applicationName: 'Comodos',
  category:'arriendo'
};

export default function LoginPage() {
  return (
    <div className="flex w-full h-dvh ">
        <LoginForm/>
    </div>
  );
}