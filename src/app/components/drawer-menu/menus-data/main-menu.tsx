import { Menu } from "@/interfaces"
import { MdOutlineFavorite, MdPostAdd } from "react-icons/md";
import { CiLocationOn, CiShoppingTag } from "react-icons/ci";

export const mainMenu: Menu[] = [
    {
        icon: <MdPostAdd />,
        href: "/",
        title: "Anuncios",
        auth:true
    },
    {
        icon: <CiLocationOn />,
        href: "/ubicacion",
        title: "Ubicación"
    },
    {
        icon: <CiShoppingTag />,
        href: "/",
        title: "Suscripciones",
        auth: true
    },
    {
        icon: <MdOutlineFavorite />,
        href: "/",
        title: "Favoritos",
        auth:true
    }

];