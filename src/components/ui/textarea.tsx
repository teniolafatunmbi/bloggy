import React from 'react';
import { cn } from "@/lib"
 
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik?: any
  }
 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, formik, ...props }, ref) => {
    return (
      <>
        <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea"
 
export { Textarea }