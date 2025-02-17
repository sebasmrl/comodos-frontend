"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

interface CustomScrollAreaProps{
  scrollAreaScrollbarStyle?: string;
  scrollAreaThumbStyle?:string;
}

interface CustomScrollBarProps{
  scrollAreaScrollbarStyle?: string;
  scrollAreaThumbStyle?:string;
}


const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & CustomScrollAreaProps
>(({ className, children,scrollAreaScrollbarStyle, scrollAreaThumbStyle, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar  scrollAreaScrollbarStyle={scrollAreaScrollbarStyle} scrollAreaThumbStyle={scrollAreaThumbStyle}/>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & CustomScrollBarProps
>(({ className, orientation = "vertical", scrollAreaScrollbarStyle, scrollAreaThumbStyle, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && 
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
      scrollAreaScrollbarStyle
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={cn( 
      "relative flex-1 rounded-full bg-border",
      scrollAreaThumbStyle
      )} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
