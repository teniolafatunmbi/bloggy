import * as React from "react"

import { cn } from "@/lib"
import { cva } from "class-variance-authority"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  )

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InputProps = React.ComponentPropsWithoutRef<'input'> & { formik?: any }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, formik, ...props }, ref) => {

    return (
      <>
        <input
          type={type}
          className={cn(
              inputVariants(),
            className
          )}
          ref={ref}
          {...props}
        />
        {formik && (formik?.touched?.[props.name!] && formik?.errors?.[props.name!]) && (
            <p className="m-0 text-rose-700" style={{fontSize: '13px'}}>
              <small>{formik?.errors?.[props.name!] as unknown as string}</small>
            </p>
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
