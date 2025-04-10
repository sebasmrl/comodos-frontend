'use client';

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { MouseEvent, PropsWithChildren } from 'react';

interface Props {
    className?: string;
    actionCallback?: ()=>Promise<void>; 
}

export const BackButton = ({ className, children, actionCallback }: PropsWithChildren<Props>) => {

    const router = useRouter();

    return (
        <Button
            className={cn("", className)}
            variant={'outline'}
            onClick={ async(e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                if(actionCallback) await actionCallback();
                router.back();
            }} >
            {children}
        </Button>
    )
}
