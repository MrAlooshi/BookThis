"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const Marquee = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    pauseOnHover?: boolean
    reverse?: boolean
    fade?: boolean
  }
>(({ className, children, pauseOnHover, reverse, fade, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex w-full overflow-hidden [--duration:40s] [--gap:1rem]", className)} {...props}>
      <div
        className={cn(
          "flex w-max animate-marquee items-stretch gap-[--gap]",
          pauseOnHover && "hover:[animation-play-state:paused]",
          reverse && "animation-direction:reverse",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
})
Marquee.displayName = "Marquee"

