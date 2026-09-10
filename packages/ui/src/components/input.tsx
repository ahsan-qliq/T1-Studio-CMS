import * as React from "react"
import { cn } from "cn"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-900 shadow-xs transition-colors",
        "placeholder:text-zinc-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-400 aria-invalid:ring-red-300",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
