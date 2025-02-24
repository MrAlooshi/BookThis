"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const PulsatingButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground",
          "before:absolute before:inset-0 before:animate-pulse-slow before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all hover:before:animate-none",
          "after:absolute after:inset-[-2px] after:-z-10 after:rounded-lg after:animate-border-pulse after:bg-gradient-to-r after:from-primary/50 after:via-primary after:to-primary/50",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
PulsatingButton.displayName = "PulsatingButton"

