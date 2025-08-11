import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props{
    className?:string;
}

export const Footer = ({ className}:Props) => {
  return (
    <footer className={cn("bg-gray-100 dark:bg-background py-6 text-center text-xs sm:text-sm  text-gray-600 dark:text-gray-200 gap-2", className)}>
      <p>© 2025 Comodos. Todos los derechos reservados. </p> <Link  className="hover:underline" href='/legal'>Términos, condiciones y políticas</Link>
    </footer>
  )
}
