// "use client"

// import { Controller } from "react-hook-form"
// import { Input } from "@workspace/ui/components/input"
// import { Label } from "@workspace/ui/components/label"
// import { LocalizedField, PlainField, BoolField, ImageField } from "../home-page-form/shared-fields"

// // `any` (not `Control<any>`) for the same reason shared-fields.tsx uses it:
// // Control objects from different useForm<T>() instantiations aren't
// // structurally assignable to one another even under Control<any>.
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type AnyControl = any

// /** Comma-separated editor for a plain string[] field like seo.keywords.en */
// function KeywordsInput({ control, name, label }: { control: AnyControl; name: string; label: string }) {
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-sm font-medium">{label}</Label>
//       <Controller
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <Input
//             value={(field.value ?? []).join(", ")}
//             onChange={(e) =>
//               field.onChange(
//                 e.target.value
//                   .split(",")
//                   .map((s) => s.trim())
//                   .filter(Boolean)
//               )
//             }
//             placeholder="kitchen design dubai, bespoke kitchens dubai"
//           />
//         )}
//       />
//     </div>
//   )
// }

// /**
//  * SEO block shared by any page-level form. `namePrefix` is the form path
//  * to the seo object, e.g. "seo".
//  */
// export function SeoFields({ control, namePrefix = "seo" }: { control: AnyControl; namePrefix?: string }) {
//   return (
//     <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4">
//       <h3 className="text-sm font-semibold text-zinc-900">SEO</h3>
//       <LocalizedField control={control} name={`${namePrefix}.metaTitle`} label="Meta Title" />
//       <LocalizedField control={control} name={`${namePrefix}.metaDescription`} label="Meta Description" multiline />
//       <div className="grid grid-cols-2 gap-3">
//         <KeywordsInput control={control} name={`${namePrefix}.keywords.en`} label="Keywords (EN, comma-separated)" />
//         <KeywordsInput control={control} name={`${namePrefix}.keywords.ar`} label="Keywords (AR, comma-separated)" />
//       </div>
//       <PlainField control={control} name={`${namePrefix}.canonicalUrl`} label="Canonical URL" placeholder="https://..." />
//       <ImageField control={control} name={`${namePrefix}.ogImage`} label="OG Image" />
//       <div className="grid grid-cols-2 gap-4">
//         <BoolField control={control} name={`${namePrefix}.noIndex`} label="No Index" />
//         <BoolField control={control} name={`${namePrefix}.noFollow`} label="No Follow" />
//       </div>
//     </div>
//   )
// }

"use client"

import { Controller } from "react-hook-form"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  LocalizedField,
  PlainField,
  BoolField,
  ImageField,
} from "../home-page-form/shared-fields"

/** Comma-separated editor for a plain string[] field like seo.keywords.en */
function KeywordsInput({
  control,
  name,
  label,
}: {
  control: any
  name: string
  label: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            value={(field.value ?? []).join(", ")}
            onChange={(e) =>
              field.onChange(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            placeholder="kitchen design dubai, bespoke kitchens dubai"
          />
        )}
      />
    </div>
  )
}

/**
 * SEO block shared by any page-level form. `namePrefix` is the form path
 * to the seo object, e.g. "seo".
 */
export function SeoFields({
  control,
  namePrefix = "seo",
}: {
  control: any
  namePrefix?: string
}) {
  return (
    <div className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-zinc-900">SEO</h3>
      <LocalizedField
        control={control}
        name={`${namePrefix}.metaTitle`}
        label="Meta Title"
      />
      <LocalizedField
        control={control}
        name={`${namePrefix}.metaDescription`}
        label="Meta Description"
        multiline
      />
      <div className="grid grid-cols-2 gap-3">
        <KeywordsInput
          control={control}
          name={`${namePrefix}.keywords.en`}
          label="Keywords (EN, comma-separated)"
        />
        <KeywordsInput
          control={control}
          name={`${namePrefix}.keywords.ar`}
          label="Keywords (AR, comma-separated)"
        />
      </div>
      <PlainField
        control={control}
        name={`${namePrefix}.canonicalUrl`}
        label="Canonical URL"
        placeholder="https://..."
      />
      <ImageField
        control={control}
        name={`${namePrefix}.ogImage`}
        label="OG Image"
      />
      <div className="grid grid-cols-2 gap-4">
        <BoolField
          control={control}
          name={`${namePrefix}.noIndex`}
          label="No Index"
        />
        <BoolField
          control={control}
          name={`${namePrefix}.noFollow`}
          label="No Follow"
        />
      </div>
    </div>
  )
}
