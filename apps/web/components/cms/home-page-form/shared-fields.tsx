// // "use client"

// // import { useState } from "react"
// // import { Controller, type Control } from "react-hook-form"
// // import { ChevronDown, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
// // import { Input } from "@workspace/ui/components/input"
// // import { Textarea } from "@workspace/ui/components/textarea"
// // import { Label } from "@workspace/ui/components/label"
// // import { VisibilityToggle } from "../section-detail/shared/visibility-toggle"

// // /**
// //  * Bilingual EN/AR text field, bound directly to a `{ en, ar }` path in the
// //  * form (e.g. "sections.hero.heading"). Renders EN and AR inputs side by side.
// //  */
// // export function LocalizedField({
// //   control,
// //   name,
// //   label,
// //   multiline = false,
// // }: {
// //   control: Control<any>
// //   name: string
// //   label: string
// //   multiline?: boolean
// // }) {
// //   const FieldEl = multiline ? Textarea : Input
// //   return (
// //     <div className="space-y-1.5">
// //       <Label className="text-sm font-medium">{label}</Label>
// //       <div className="grid grid-cols-2 gap-3">
// //         <Controller
// //           control={control}
// //           name={`${name}.en`}
// //           render={({ field }) => (
// //             <FieldEl {...field} placeholder={`${label} (English)`} />
// //           )}
// //         />
// //         <Controller
// //           control={control}
// //           name={`${name}.ar`}
// //           render={({ field }) => (
// //             <FieldEl {...field} dir="rtl" placeholder={`${label} (Arabic)`} />
// //           )}
// //         />
// //       </div>
// //     </div>
// //   )
// // }

// // /** A single plain (non-bilingual) text field, e.g. a URL or a number. */
// // export function PlainField({
// //   control,
// //   name,
// //   label,
// //   placeholder,
// //   type = "text",
// // }: {
// //   control: Control<any>
// //   name: string
// //   label: string
// //   placeholder?: string
// //   type?: string
// // }) {
// //   return (
// //     <div className="space-y-1.5">
// //       <Label className="text-sm font-medium">{label}</Label>
// //       <Controller
// //         control={control}
// //         name={name}
// //         render={({ field }) => (
// //           <Input
// //             {...field}
// //             type={type}
// //             value={field.value ?? ""}
// //             placeholder={placeholder}
// //           />
// //         )}
// //       />
// //     </div>
// //   )
// // }

// // /** A single boolean toggle, e.g. isVisible / openInNewTab. */
// // export function BoolField({
// //   control,
// //   name,
// //   label,
// // }: {
// //   control: Control<any>
// //   name: string
// //   label: string
// // }) {
// //   return (
// //     <div className="flex items-center gap-2">
// //       <Controller
// //         control={control}
// //         name={name}
// //         render={({ field }) => (
// //           <VisibilityToggle checked={!!field.value} onChange={field.onChange} ariaLabel={label} />
// //         )}
// //       />
// //       <Label className="text-sm font-medium">{label}</Label>
// //     </div>
// //   )
// // }

// // /** Image sub-object field: url + EN/AR alt text. */
// // export function ImageField({
// //   control,
// //   name,
// //   label,
// // }: {
// //   control: Control<any>
// //   name: string
// //   label: string
// // }) {
// //   return (
// //     <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
// //       <p className="text-xs font-medium text-zinc-600">{label}</p>
// //       <PlainField control={control} name={`${name}.url`} label="Image URL" placeholder="https://..." />
// //       <LocalizedField control={control} name={`${name}.alt`} label="Alt Text" />
// //     </div>
// //   )
// // }

// // /** Button sub-object field: EN/AR label + href + open-in-new-tab. */
// // export function ButtonField({
// //   control,
// //   name,
// //   label,
// // }: {
// //   control: Control<any>
// //   name: string
// //   label: string
// // }) {
// //   return (
// //     <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
// //       <p className="text-xs font-medium text-zinc-600">{label}</p>
// //       <LocalizedField control={control} name={`${name}.label`} label="Button Label" />
// //       <div className="grid grid-cols-[1fr_auto] items-end gap-3">
// //         <PlainField control={control} name={`${name}.href`} label="Link URL" placeholder="/spaces" />
// //         <div className="pb-2">
// //           <BoolField control={control} name={`${name}.openInNewTab`} label="New tab" />
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // /** Delete button used inside repeatable array item cards. */
// // export function DeleteItemButton({ onClick, label }: { onClick: () => void; label?: string }) {
// //   return (
// //     <button
// //       type="button"
// //       onClick={onClick}
// //       aria-label={label ?? "Delete item"}
// //       className="shrink-0 rounded p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
// //     >
// //       <Trash2 className="size-4" aria-hidden />
// //     </button>
// //   )
// // }

// // /** Add button used at the bottom of repeatable array lists. */
// // export function AddItemButton({ onClick, label }: { onClick: () => void; label: string }) {
// //   return (
// //     <button
// //       type="button"
// //       onClick={onClick}
// //       className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-2.5 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700"
// //     >
// //       <Plus className="size-4" aria-hidden />
// //       {label}
// //     </button>
// //   )
// // }

// // /**
// //  * Collapsible section wrapper. All 14 sections in the unified form share
// //  * this shell: a header row (name, visibility toggle, expand/collapse) and
// //  * a content area that only mounts its children while expanded.
// //  */
// // export function SectionAccordion({
// //   title,
// //   order,
// //   control,
// //   visibleName,
// //   defaultOpen = false,
// //   children,
// // }: {
// //   title: string
// //   order: number
// //   control: Control<any>
// //   visibleName: string
// //   defaultOpen?: boolean
// //   children: React.ReactNode
// // }) {
// //   const [open, setOpen] = useState(defaultOpen)

// //   return (
// //     <div className="rounded-lg border border-zinc-200 bg-white">
// //       <div className="flex items-center gap-3 px-4 py-3">
// //         <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
// //           {String(order).padStart(2, "0")}
// //         </span>
// //         <button
// //           type="button"
// //           onClick={() => setOpen((o) => !o)}
// //           className="flex flex-1 items-center justify-between gap-2 text-left"
// //         >
// //           <span className="text-sm font-semibold text-zinc-900">{title}</span>
// //           <ChevronDown
// //             className={`size-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
// //             aria-hidden
// //           />
// //         </button>
// //         <Controller
// //           control={control}
// //           name={visibleName}
// //           render={({ field }) => (
// //             <button
// //               type="button"
// //               onClick={() => field.onChange(!field.value)}
// //               aria-label={field.value ? "Hide section" : "Show section"}
// //               className="shrink-0 rounded p-1 text-zinc-500 hover:bg-zinc-100"
// //             >
// //               {field.value ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
// //             </button>
// //           )}
// //         />
// //       </div>
// //       {open && <div className="space-y-4 border-t border-zinc-100 px-4 py-4">{children}</div>}
// //     </div>
// //   )
// // }

// "use client"

// import { useState } from "react"
// import { Controller } from "react-hook-form"
// import { ChevronDown, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
// import { Input } from "@workspace/ui/components/input"
// import { Textarea } from "@workspace/ui/components/textarea"
// import { Label } from "@workspace/ui/components/label"
// import { VisibilityToggle } from "../section-detail/shared/visibility-toggle"

// // These field primitives are shared across every page-level form (home,
// // spaces, space-detail, projects, project-detail, ...) — each has its own
// // distinct data shape. `Control` objects from different `useForm<T>()`
// // instantiations aren't structurally assignable to one another even under
// // `Control<any>` (react-hook-form's internal `_options.validate` etc. stay
// // invariant), so these props are typed as plain `any` — the same escape
// // hatch form-shared/seo-field.tsx already relies on (`Control<any>` there
// // works for its own leaf-level checks, but not here where SectionAccordion
// // also threads the value through a Controller `name` typed against a
// // specific field-value shape). This keeps the components reusable across
// // every form without callers needing per-call-site casts.
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type HomePageControl = any
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type HomePagePath = any

// /**
//  * Bilingual EN/AR text field, bound directly to a `{ en, ar }` path in the
//  * form (e.g. "sections.hero.heading"). Renders EN and AR inputs side by side.
//  */
// export function LocalizedField({
//   control,
//   name,
//   label,
//   multiline = false,
// }: {
//   control: HomePageControl
//   name: string
//   label: string
//   multiline?: boolean
// }) {
//   const FieldEl = multiline ? Textarea : Input
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-sm font-medium">{label}</Label>
//       <div className="grid grid-cols-2 gap-3">
//         <Controller
//           control={control}
//           name={`${name}.en` as HomePagePath}
//           render={({ field }) => (
//             <FieldEl
//               {...field}
//               value={
//                 typeof field.value === "string"
//                   ? field.value
//                   : field.value == null
//                     ? ""
//                     : String(field.value)
//               }
//               placeholder={`${label} (English)`}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name={`${name}.ar` as HomePagePath}
//           render={({ field }) => (
//             <FieldEl
//               {...field}
//               value={
//                 typeof field.value === "string"
//                   ? field.value
//                   : field.value == null
//                     ? ""
//                     : String(field.value)
//               }
//               dir="rtl"
//               placeholder={`${label} (Arabic)`}
//             />
//           )}
//         />
//       </div>
//     </div>
//   )
// }

// /** A single plain (non-bilingual) text field, e.g. a URL or a number. */
// export function PlainField({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
// }: {
//   control: HomePageControl
//   name: string
//   label: string
//   placeholder?: string
//   type?: string
// }) {
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-sm font-medium">{label}</Label>
//       <Controller
//         control={control}
//         name={name as HomePagePath}
//         render={({ field }) => (
//           <Input
//             {...field}
//             type={type}
//             value={
//               typeof field.value === "string"
//                 ? field.value
//                 : field.value == null
//                   ? ""
//                   : String(field.value)
//             }
//             placeholder={placeholder}
//           />
//         )}
//       />
//     </div>
//   )
// }

// /** A single boolean toggle, e.g. isVisible / openInNewTab. */
// export function BoolField({
//   control,
//   name,
//   label,
// }: {
//   control: HomePageControl
//   name: string
//   label: string
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <Controller
//         control={control}
//         name={name as HomePagePath}
//         render={({ field }) => (
//           <VisibilityToggle
//             checked={!!field.value}
//             onChange={field.onChange}
//             ariaLabel={label}
//           />
//         )}
//       />
//       <Label className="text-sm font-medium">{label}</Label>
//     </div>
//   )
// }

// /** Image sub-object field: url + EN/AR alt text. */
// export function ImageField({
//   control,
//   name,
//   label,
// }: {
//   control: HomePageControl
//   name: string
//   label: string
// }) {
//   return (
//     <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
//       <p className="text-xs font-medium text-zinc-600">{label}</p>
//       <PlainField
//         control={control}
//         name={`${name}.url`}
//         label="Image URL"
//         placeholder="https://..."
//       />
//       <LocalizedField control={control} name={`${name}.alt`} label="Alt Text" />
//     </div>
//   )
// }

// /** Button sub-object field: EN/AR label + href + open-in-new-tab. */
// export function ButtonField({
//   control,
//   name,
//   label,
// }: {
//   control: HomePageControl
//   name: string
//   label: string
// }) {
//   return (
//     <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
//       <p className="text-xs font-medium text-zinc-600">{label}</p>
//       <LocalizedField
//         control={control}
//         name={`${name}.label`}
//         label="Button Label"
//       />
//       <div className="grid grid-cols-[1fr_auto] items-end gap-3">
//         <PlainField
//           control={control}
//           name={`${name}.href`}
//           label="Link URL"
//           placeholder="/spaces"
//         />
//         <div className="pb-2">
//           <BoolField
//             control={control}
//             name={`${name}.openInNewTab`}
//             label="New tab"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// /** Delete button used inside repeatable array item cards. */
// export function DeleteItemButton({
//   onClick,
//   label,
// }: {
//   onClick: () => void
//   label?: string
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={label ?? "Delete item"}
//       className="shrink-0 rounded p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
//     >
//       <Trash2 className="size-4" aria-hidden />
//     </button>
//   )
// }

// /** Add button used at the bottom of repeatable array lists. */
// export function AddItemButton({
//   onClick,
//   label,
// }: {
//   onClick: () => void
//   label: string
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-2.5 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700"
//     >
//       <Plus className="size-4" aria-hidden />
//       {label}
//     </button>
//   )
// }

// /**
//  * Collapsible section wrapper. All 14 sections in the unified form share
//  * this shell: a header row (name, visibility toggle, expand/collapse) and
//  * a content area that only mounts its children while expanded.
//  */
// export function SectionAccordion({
//   title,
//   order,
//   control,
//   visibleName,
//   defaultOpen = false,
//   children,
// }: {
//   title: string
//   order: number
//   control: HomePageControl
//   visibleName: string
//   defaultOpen?: boolean
//   children: React.ReactNode
// }) {
//   const [open, setOpen] = useState(defaultOpen)

//   return (
//     <div className="rounded-lg border border-zinc-200 bg-white">
//       <div className="flex items-center gap-3 px-4 py-3">
//         <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
//           {String(order).padStart(2, "0")}
//         </span>
//         <button
//           type="button"
//           onClick={() => setOpen((o) => !o)}
//           className="flex flex-1 items-center justify-between gap-2 text-left"
//         >
//           <span className="text-sm font-semibold text-zinc-900">{title}</span>
//           <ChevronDown
//             className={`size-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
//             aria-hidden
//           />
//         </button>
//         <Controller
//           control={control}
//           name={visibleName as HomePagePath}
//           render={({ field }) => (
//             <button
//               type="button"
//               onClick={() => field.onChange(!field.value)}
//               aria-label={field.value ? "Hide section" : "Show section"}
//               className="shrink-0 rounded p-1 text-zinc-500 hover:bg-zinc-100"
//             >
//               {field.value ? (
//                 <Eye className="size-4" />
//               ) : (
//                 <EyeOff className="size-4" />
//               )}
//             </button>
//           )}
//         />
//       </div>
//       {open && (
//         <div className="space-y-4 border-t border-zinc-100 px-4 py-4">
//           {children}
//         </div>
//       )}
//     </div>
//   )
// }

// "use client"

// import { useState } from "react"
// import { Controller, type Control } from "react-hook-form"
// import { ChevronDown, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
// import { Input } from "@workspace/ui/components/input"
// import { Textarea } from "@workspace/ui/components/textarea"
// import { Label } from "@workspace/ui/components/label"
// import { VisibilityToggle } from "../section-detail/shared/visibility-toggle"

// /**
//  * Bilingual EN/AR text field, bound directly to a `{ en, ar }` path in the
//  * form (e.g. "sections.hero.heading"). Renders EN and AR inputs side by side.
//  */
// export function LocalizedField({
//   control,
//   name,
//   label,
//   multiline = false,
// }: {
//   control: Control<any>
//   name: string
//   label: string
//   multiline?: boolean
// }) {
//   const FieldEl = multiline ? Textarea : Input
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-sm font-medium">{label}</Label>
//       <div className="grid grid-cols-2 gap-3">
//         <Controller
//           control={control}
//           name={`${name}.en`}
//           render={({ field }) => (
//             <FieldEl {...field} placeholder={`${label} (English)`} />
//           )}
//         />
//         <Controller
//           control={control}
//           name={`${name}.ar`}
//           render={({ field }) => (
//             <FieldEl {...field} dir="rtl" placeholder={`${label} (Arabic)`} />
//           )}
//         />
//       </div>
//     </div>
//   )
// }

// /** A single plain (non-bilingual) text field, e.g. a URL or a number. */
// export function PlainField({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
// }: {
//   control: Control<any>
//   name: string
//   label: string
//   placeholder?: string
//   type?: string
// }) {
//   return (
//     <div className="space-y-1.5">
//       <Label className="text-sm font-medium">{label}</Label>
//       <Controller
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <Input
//             {...field}
//             type={type}
//             value={field.value ?? ""}
//             placeholder={placeholder}
//           />
//         )}
//       />
//     </div>
//   )
// }

// /** A single boolean toggle, e.g. isVisible / openInNewTab. */
// export function BoolField({
//   control,
//   name,
//   label,
// }: {
//   control: Control<any>
//   name: string
//   label: string
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <Controller
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <VisibilityToggle checked={!!field.value} onChange={field.onChange} ariaLabel={label} />
//         )}
//       />
//       <Label className="text-sm font-medium">{label}</Label>
//     </div>
//   )
// }

// /** Image sub-object field: url + EN/AR alt text. */
// export function ImageField({
//   control,
//   name,
//   label,
// }: {
//   control: Control<any>
//   name: string
//   label: string
// }) {
//   return (
//     <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
//       <p className="text-xs font-medium text-zinc-600">{label}</p>
//       <PlainField control={control} name={`${name}.url`} label="Image URL" placeholder="https://..." />
//       <LocalizedField control={control} name={`${name}.alt`} label="Alt Text" />
//     </div>
//   )
// }

// /** Button sub-object field: EN/AR label + href + open-in-new-tab. */
// export function ButtonField({
//   control,
//   name,
//   label,
// }: {
//   control: Control<any>
//   name: string
//   label: string
// }) {
//   return (
//     <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
//       <p className="text-xs font-medium text-zinc-600">{label}</p>
//       <LocalizedField control={control} name={`${name}.label`} label="Button Label" />
//       <div className="grid grid-cols-[1fr_auto] items-end gap-3">
//         <PlainField control={control} name={`${name}.href`} label="Link URL" placeholder="/spaces" />
//         <div className="pb-2">
//           <BoolField control={control} name={`${name}.openInNewTab`} label="New tab" />
//         </div>
//       </div>
//     </div>
//   )
// }

// /** Delete button used inside repeatable array item cards. */
// export function DeleteItemButton({ onClick, label }: { onClick: () => void; label?: string }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={label ?? "Delete item"}
//       className="shrink-0 rounded p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
//     >
//       <Trash2 className="size-4" aria-hidden />
//     </button>
//   )
// }

// /** Add button used at the bottom of repeatable array lists. */
// export function AddItemButton({ onClick, label }: { onClick: () => void; label: string }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-200 py-2.5 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700"
//     >
//       <Plus className="size-4" aria-hidden />
//       {label}
//     </button>
//   )
// }

// /**
//  * Collapsible section wrapper. All 14 sections in the unified form share
//  * this shell: a header row (name, visibility toggle, expand/collapse) and
//  * a content area that only mounts its children while expanded.
//  */
// export function SectionAccordion({
//   title,
//   order,
//   control,
//   visibleName,
//   defaultOpen = false,
//   children,
// }: {
//   title: string
//   order: number
//   control: Control<any>
//   visibleName: string
//   defaultOpen?: boolean
//   children: React.ReactNode
// }) {
//   const [open, setOpen] = useState(defaultOpen)

//   return (
//     <div className="rounded-lg border border-zinc-200 bg-white">
//       <div className="flex items-center gap-3 px-4 py-3">
//         <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
//           {String(order).padStart(2, "0")}
//         </span>
//         <button
//           type="button"
//           onClick={() => setOpen((o) => !o)}
//           className="flex flex-1 items-center justify-between gap-2 text-left"
//         >
//           <span className="text-sm font-semibold text-zinc-900">{title}</span>
//           <ChevronDown
//             className={`size-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
//             aria-hidden
//           />
//         </button>
//         <Controller
//           control={control}
//           name={visibleName}
//           render={({ field }) => (
//             <button
//               type="button"
//               onClick={() => field.onChange(!field.value)}
//               aria-label={field.value ? "Hide section" : "Show section"}
//               className="shrink-0 rounded p-1 text-zinc-500 hover:bg-zinc-100"
//             >
//               {field.value ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
//             </button>
//           )}
//         />
//       </div>
//       {open && <div className="space-y-4 border-t border-zinc-100 px-4 py-4">{children}</div>}
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Controller, type FieldPath } from "react-hook-form"
import { ChevronDown, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"
import { Button } from "@workspace/ui/components/button"
import { VisibilityToggle } from "../section-detail/shared/visibility-toggle"
import type { HomePageSections } from "@/types/api-home-page"

type HomePageControl = any
type HomePagePath = FieldPath<HomePageSections>

/**
 * Bilingual EN/AR text field, bound directly to a `{ en, ar }` path in the
 * form (e.g. "sections.hero.heading"). Renders EN and AR inputs side by side.
 */
export function LocalizedField({
  control,
  name,
  label,
  multiline = false,
}: {
  control: HomePageControl
  name: string
  label: string
  multiline?: boolean
}) {
  const FieldEl = multiline ? Textarea : Input
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-2 gap-3">
        <Controller
          control={control}
          name={`${name}.en` as HomePagePath}
          render={({ field }) => (
            <FieldEl
              {...field}
              value={
                typeof field.value === "string"
                  ? field.value
                  : field.value == null
                    ? ""
                    : String(field.value)
              }
              placeholder={`${label} (English)`}
            />
          )}
        />
        <Controller
          control={control}
          name={`${name}.ar` as HomePagePath}
          render={({ field }) => (
            <FieldEl
              {...field}
              value={
                typeof field.value === "string"
                  ? field.value
                  : field.value == null
                    ? ""
                    : String(field.value)
              }
              dir="rtl"
              placeholder={`${label} (Arabic)`}
            />
          )}
        />
      </div>
    </div>
  )
}

/** A single plain (non-bilingual) text field, e.g. a URL or a number. */
export function PlainField({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: {
  control: HomePageControl
  name: string
  label: string
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Controller
        control={control}
        name={name as HomePagePath}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            value={
              typeof field.value === "string"
                ? field.value
                : field.value == null
                  ? ""
                  : String(field.value)
            }
            placeholder={placeholder}
          />
        )}
      />
    </div>
  )
}

/** A single boolean toggle, e.g. isVisible / openInNewTab. */
export function BoolField({
  control,
  name,
  label,
}: {
  control: HomePageControl
  name: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Controller
        control={control}
        name={name as HomePagePath}
        render={({ field }) => (
          <VisibilityToggle
            checked={!!field.value}
            onChange={field.onChange}
            ariaLabel={label}
          />
        )}
      />
      <Label className="text-sm font-medium">{label}</Label>
    </div>
  )
}

/** Image sub-object field: url + EN/AR alt text. */
export function ImageField({
  control,
  name,
  label,
}: {
  control: HomePageControl
  name: string
  label: string
}) {
  const inputId = `image-upload-${name.replace(/[^a-zA-Z0-9]/g, "-")}`

  return (
    <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
      <p className="text-xs font-medium text-zinc-600">{label}</p>
      <Controller
        control={control}
        name={`${name}.url` as HomePagePath}
        render={({ field }) => (
          <div className="space-y-2">
            <input
              id={inputId}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (!file) return
                if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                  alert("Please upload a JPG, PNG or WEBP image.")
                  event.target.value = ""
                  return
                }
                if (file.size > 5 * 1024 * 1024) {
                  alert("Image must be smaller than 5MB.")
                  event.target.value = ""
                  return
                }
                const reader = new FileReader()
                reader.onload = () => {
                  if (typeof reader.result === "string") field.onChange(reader.result)
                }
                reader.readAsDataURL(file)
              }}
            />
            <label
              htmlFor={inputId}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-zinc-300 bg-white p-3 transition hover:border-zinc-500"
            >
              {field.value ? (
                <img
                  src={field.value}
                  alt={label}
                  className="size-16 rounded object-cover"
                />
              ) : (
                <span className="flex size-16 items-center justify-center rounded bg-zinc-100 text-xs text-zinc-500">
                  Upload
                </span>
              )}
              <span className="text-xs text-zinc-600">
                {field.value ? "Click to replace image" : "Click to upload image"}
                <span className="mt-1 block text-[11px] text-zinc-400">
                  JPG, PNG or WEBP · Max 5MB
                </span>
              </span>
            </label>
            {field.value && (
              <button
                type="button"
                className="text-xs text-red-600 hover:text-red-700"
                onClick={() => {
                  field.onChange("")
                  const input = document.getElementById(inputId) as HTMLInputElement | null
                  if (input) input.value = ""
                }}
              >
                Remove image
              </button>
            )}
            <PlainField
              control={control}
              name={`${name}.url`}
              label="Image URL or uploaded data"
              placeholder="https://..."
            />
          </div>
        )}
      />
      <LocalizedField control={control} name={`${name}.alt`} label="Alt Text" />
    </div>
  )
}

/** Button sub-object field: EN/AR label + href + open-in-new-tab. */
export function ButtonField({
  control,
  name,
  label,
}: {
  control: HomePageControl
  name: string
  label: string
}) {
  return (
    <div className="space-y-2 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
      <p className="text-xs font-medium text-zinc-600">{label}</p>
      <LocalizedField
        control={control}
        name={`${name}.label`}
        label="Button Label"
      />
      <div className="grid grid-cols-[1fr_auto] items-end gap-3">
        <PlainField
          control={control}
          name={`${name}.href`}
          label="Link URL"
          placeholder="/spaces"
        />
        <div className="pb-2">
          <BoolField
            control={control}
            name={`${name}.openInNewTab`}
            label="New tab"
          />
        </div>
      </div>
    </div>
  )
}

/** Delete button used inside repeatable array item cards. */
export function DeleteItemButton({
  onClick,
  label,
}: {
  onClick: () => void
  label?: string
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label={label ?? "Delete item"}
      variant="ghost"
      size="icon-sm"
      className="text-red-400 hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 className="size-4" aria-hidden />
    </Button>
  )
}

/** Add button used at the bottom of repeatable array lists. */
export function AddItemButton({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant="outline"
      className="w-full border-dashed text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700"
    >
      <Plus className="size-4" aria-hidden />
      {label}
    </Button>
  )
}

/**
 * Collapsible section wrapper. All 14 sections in the unified form share
 * this shell: a header row (name, visibility toggle, expand/collapse) and
 * a content area that only mounts its children while expanded.
 */
export function SectionAccordion({
  title,
  order,
  control,
  visibleName,
  defaultOpen = false,
  children,
}: {
  title: string
  order: number
  control: HomePageControl
  visibleName: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-xs font-semibold text-zinc-600">
          {String(order).padStart(2, "0")}
        </span>
        <Button
          type="button"
          onClick={() => setOpen((o) => !o)}
          variant="ghost"
          className="h-auto flex-1 justify-between gap-2 px-0 text-left"
        >
          <span className="text-sm font-semibold text-zinc-900">{title}</span>
          <ChevronDown
            className={`size-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </Button>
        <Controller
          control={control}
          name={visibleName as HomePagePath}
          render={({ field }) => (
            <Button
              type="button"
              onClick={() => field.onChange(!field.value)}
              aria-label={field.value ? "Hide section" : "Show section"}
              variant="ghost"
              size="icon-sm"
              className="text-zinc-500 hover:bg-zinc-100"
            >
              {field.value ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Button>
          )}
        />
      </div>
      {open && (
        <div className="space-y-4 border-t border-zinc-100 px-4 py-4">
          {children}
        </div>
      )}
    </div>
  )
}
