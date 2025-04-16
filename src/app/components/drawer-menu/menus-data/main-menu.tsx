import { Menu } from "@/interfaces"
import { MdOutlineFavorite, MdPostAdd } from "react-icons/md";
import { CiLocationOn, CiShoppingTag } from "react-icons/ci";

export const mainMenu: Menu[] = [
    {
        icon: <MdPostAdd />,
        href: "/anuncios",
        title: "Anuncios",
        auth:false //TODO: Deber ser true en produccion
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
        href: "/favoritos",
        title: "Favoritos",
        auth:false //TODO: Deber ser true en produccion
    }

];