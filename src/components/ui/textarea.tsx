import { cn } from '@/lib';
import { cva } from 'class-variance-authority';
import React, { ComponentPropsWithoutRef } from 'react'

const textareaVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  )

const Textarea = React.forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<'textarea'>>(({ className, ...props }, ref) => {
  return (
    <textarea
        ref={ref}
        className={cn(textareaVariants, className)}
        {...props}
    />
  )
});

Textarea.displayName = "Textarea"

export default Textarea