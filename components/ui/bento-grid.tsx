import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-3 gap-4 p-4", className)} {...props}>
      {children}
    </div>
  )
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: React.ComponentType<{ className?: string }>
  name: string
  description: string
  header?: React.ReactNode
  background?: React.ReactNode
  href?: string
  cta?: string
}

export function BentoCard({
  className,
  Icon,
  name,
  description,
  header,
  background,
  href,
  cta,
  ...props
}: BentoCardProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border bg-background p-6", className)} {...props}>
      {background}
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-8 w-8" />}
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
        <p className="mt-2 text-muted-foreground">{description}</p>
        {href && (
          <Link href={href} className="mt-4 inline-flex items-center text-sm text-primary hover:underline">
            {cta || "Learn more"} →
          </Link>
        )}
      </div>
    </div>
  )
}

