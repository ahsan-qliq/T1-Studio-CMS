import { useEffect } from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"

/**
 * Subscribes to react-hook-form's watch stream and calls onChange
 * whenever any field changes. Cleans up the subscription on unmount.
 */
export function useFormSync<T extends FieldValues>(
  form: UseFormReturn<T>,
  onChange: (values: T) => void
) {
  useEffect(() => {
    const sub = form.watch((values) => {
      onChange(values as T)
    })
    return () => sub.unsubscribe()
  }, [form, onChange])
}
