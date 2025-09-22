'use client';

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props extends React.HTMLProps<HTMLElement> {
    text: string;
    maxLength: number;
}

export const ShowMoreText = ({ text, maxLength, className }: Props) => {
    const [showMoreText, setShowMoreText] = useState<boolean>(() => (text.length < maxLength) ? true: false);
    return (
        <p className={cn("font-normal text-pretty text-accent-foreground transition-all whitespace-pre-line", className)}>
            {
                showMoreText
                    ? text
                    : `${text.substring(0, maxLength - 1)}...`
            }
            {   
                text.length >=maxLength &&
                <strong className="cursor-pointer px-1 font-semibold" onClick={() => setShowMoreText(!showMoreText)}>{ showMoreText ? 'Ver menos': 'Ver más'}</strong>
            }
        </p>
    )
}
