import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react'

interface Props extends React.HTMLAttributes<HTMLElement>{
    className?: string; 
}

export const UserAdCardItemsContainer = ({ children, className}:PropsWithChildren<Props>) => {
  return (
    <section className={cn("m-0 p-0 border border-border", className)}>
        {children}
    </section>
  )
}
