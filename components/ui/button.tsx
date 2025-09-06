import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-2xl border-2 border-dashed border-white bg-transparent px-6 py-3 uppercase text-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none",
        destructive:
          "rounded-2xl border-2 border-dashed border-red-500 bg-transparent px-6 py-3 uppercase text-red-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_red] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none",
        outline:
          "border border-gray-600 bg-transparent text-white hover:bg-gray-800",
        secondary:
          "bg-gray-700 text-white hover:bg-gray-600",
        ghost: "text-white hover:bg-gray-800",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
        purple: "rounded-2xl border-2 border-dashed border-purple-500 bg-transparent px-6 py-3 uppercase text-purple-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_purple] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none",
        green: "rounded-2xl border-2 border-dashed border-emerald-500 bg-transparent px-6 py-3 uppercase text-emerald-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_emerald] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
