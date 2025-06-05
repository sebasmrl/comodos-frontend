import { CiNoWaitingSign } from "react-icons/ci";

interface Props{
    icon?: React.ReactNode,
    text: string;
}

export const AdFeature = ({icon, text }:Props) => {
    return (
        <div className="flex items-center hover:rounded-md hover:bg-slate-300 p-2 dark:hover:text-secondary text-foreground border border-border rounded-md cursor-pointer">
            {icon ? icon : <CiNoWaitingSign className="w-6"/>}
            <p className="ml-1 text-sm font-medium text-gray-700 dark:text-inherit text-nowrap">{text}</p>
        </div>
    )
}
