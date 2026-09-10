"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { cn } from "@workspace/ui/lib/utils"
import { Label } from "@workspace/ui/components/label"

// ─── Context ────────────────────────────────────────────────────────────────

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName }

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

type FormItemContextValue = { id: string }

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

// ─── Hooks ──────────────────────────────────────────────────────────────────

export function useFormField() {
  const fieldCtx = React.useContext(FormFieldContext)
  const itemCtx = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldCtx.name) throw new Error("useFormField must be used inside <FormField>")

  const state = getFieldState(fieldCtx.name, formState)
  const { id } = itemCtx

  return {
    id,
    name: fieldCtx.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-desc`,
    formMessageId: `${id}-form-msg`,
    ...state,
  }
}

// ─── Components ─────────────────────────────────────────────────────────────

export const Form = FormProvider

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1.5", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && "text-red-600", className)}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

// FormControl clones its single child and injects id + aria attributes
export const FormControl = React.forwardRef<
  HTMLElement,
  { children: React.ReactElement<React.HTMLAttributes<HTMLElement>> }
>(({ children }, _ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return React.cloneElement(children, {
    id: formItemId,
    "aria-describedby": error
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId,
    "aria-invalid": !!error || undefined,
  })
})
FormControl.displayName = "FormControl"

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[11px] text-zinc-500", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? error) : children

  if (!body) return null

  return (
    <p
      ref={ref}
      id={formMessageId}
      role="alert"
      className={cn("text-[11px] font-medium text-red-600", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"
