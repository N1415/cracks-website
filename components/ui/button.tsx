import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Branded pill variants
        "pill-primary":
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-normal text-sm font-sans",
        "pill-light":
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-normal text-sm font-sans",
        "pill-dark":
          "bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-normal text-sm font-sans",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        pill: "h-10 px-4 py-2 gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

type PillVariant = "primary" | "light" | "dark"

interface PillButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  pillVariant?: PillVariant
  children: React.ReactNode
}

const pillVariantMap: Record<PillVariant, "pill-primary" | "pill-light" | "pill-dark"> = {
  primary: "pill-primary",
  light: "pill-light",
  dark: "pill-dark",
}

function PreviousPageButton({
  pillVariant = "primary",
  className,
  children,
  ...props
}: PillButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({ variant: pillVariantMap[pillVariant], size: "pill" }),
        className
      )}
      {...props}
    >
      <ChevronLeft className="size-3 shrink-0" strokeWidth={2.5} />
      {children}
    </button>
  )
}

function NextPageButton({
  pillVariant = "primary",
  className,
  children,
  ...props
}: PillButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({ variant: pillVariantMap[pillVariant], size: "pill" }),
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="size-3 shrink-0" strokeWidth={2.5} />
    </button>
  )
}

export { Button, buttonVariants, PreviousPageButton, NextPageButton }
export type { PillVariant, PillButtonProps }
