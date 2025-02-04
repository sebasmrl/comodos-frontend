import { Metadata } from "next";
import { RegisterForm } from "./form/RegisterForm";

export const metadata:Metadata = {
  title: 'Comodos - Registrate',
  description: 'Registrate en Comodos para acceder a todos los inmuebles que puedes elegir como tu proxima vivienda',
  keywords: ['registrate', 'nueva cuenta comodos', 'comodos', 'crear cuenta comodos', 'arriendo', 'arriendo en colombia' ],
  authors: [ { name:'Sebastian Morales', url:'https://sebastianmorales.dev'}],
  applicationName: 'Comodos',
  category:'arriendo'
};


export default function RegisterPage() {
  return (
     <div className="flex w-full ">
            <RegisterForm />
        </div>
  );
}