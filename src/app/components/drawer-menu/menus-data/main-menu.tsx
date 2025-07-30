import { Menu } from "@/interfaces"
import { MdOutlineFavorite, MdPostAdd } from "react-icons/md";
import { CiLocationOn, CiShoppingTag } from "react-icons/ci";

export const mainMenu: Menu[] = [
    {
        icon: <MdPostAdd />,
        href: "/anuncios",
        title: "Anuncios",
        auth:true 
    },
    {
        icon: <CiLocationOn />,
        href: "/ubicacion",
        title: "Ubicación",
        auth:false
    },
    {
        icon: <CiShoppingTag className="" />,
        href: "/",
        title: "Suscripciones*",
        auth: true
    },
    {
        icon: <MdOutlineFavorite />,
        href: "/favoritos",
        title: "Favoritos",
        auth:false
    }

];