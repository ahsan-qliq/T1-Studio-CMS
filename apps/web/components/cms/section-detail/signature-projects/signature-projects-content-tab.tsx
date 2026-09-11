"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, Plus } from "lucide-react"
import { Input } from "@workspace/ui/components/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SectionField } from "../shared/section-field"
import { ProjectCardRow } from "./project-card-row"
import type { Language, SignatureProjectsContent } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const GRID_POSITIONS = [
  "Top Left (1,1)",
  "Top Right (1,2)",
  "Middle Left (2,1)",
  "Middle Right (2,2)",
  "Bottom Left (3,1)",
  "Bottom Right (3,2)",
] as const

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  location: z.string(),
  imageUrl: z.string().optional(),
  position: z.enum(GRID_POSITIONS).optional(),
})

const signatureProjectsSchema = z.object({
  headingEn: z.string().min(1, "Section title is required"),
  headingAr: z.string(),
  buttonLabelEn: z.string(),
  buttonLabelAr: z.string(),
  buttonLink: z.string(),
  selectedProjects: z.array(projectSchema),
})

export type SignatureProjectsFormValues = z.infer<typeof signatureProjectsSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface SignatureProjectsContentTabProps {
  content: SignatureProjectsContent
  language: Language
  onChange: (content: SignatureProjectsContent) => void
}

export function SignatureProjectsContentTab({
  content,
  language,
  onChange,
}: SignatureProjectsContentTabProps) {
  const isEn = language === "en"

  const form = useForm<SignatureProjectsFormValues>({
    resolver: zodResolver(signatureProjectsSchema),
    defaultValues: {
      headingEn: content.headingEn,
      headingAr: content.headingAr,
      buttonLabelEn: content.buttonLabelEn,
      buttonLabelAr: content.buttonLabelAr,
      buttonLink: content.buttonLink,
      selectedProjects: content.selectedProjects,
    },
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "selectedProjects",
  })

  useFormSync(form, (values) => onChange({ ...content, ...values }))

  const addProject = () => {
    append({
      id: `proj-${Date.now()}`,
      title: "",
      location: "",
      imageUrl: undefined,
      position: undefined,
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-5 px-5 py-5" noValidate>
        <SectionField
          control={form.control}
          name={isEn ? "headingEn" : "headingAr"}
          label="Section Title"
          isRtl={!isEn}
          placeholder={isEn ? "Signature Projects" : "المشاريع المميزة"}
        />

        <div className="grid grid-cols-2 gap-4">
          <SectionField
            control={form.control}
            name={isEn ? "buttonLabelEn" : "buttonLabelAr"}
            label="Button Label"
            isRtl={!isEn}
            placeholder={isEn ? "View all Projects" : "عرض جميع المشاريع"}
          />
          {/* Button link has a custom icon overlay — kept as raw FormField */}
          <FormField
            control={form.control}
            name="buttonLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Link</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} placeholder="/projects" className="pr-9" />
                    <Link
                      className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400"
                      aria-hidden
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <fieldset className="space-y-3">
          <div className="flex items-center gap-2">
            <legend className="text-sm font-semibold text-zinc-900">Projects to Display</legend>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {fields.length} selected
            </span>
            <button
              type="button"
              onClick={addProject}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Project
            </button>
          </div>

          <div role="list" aria-label="Projects to display" className="space-y-2">
            {fields.map((field, index) => (
              <ProjectCardRow
                key={field.id}
                project={form.watch(`selectedProjects.${index}`)}
                index={index}
                register={form.register}
                onImageChange={(file) => {
                  const current = form.getValues(`selectedProjects.${index}`)
                  form.setValue(`selectedProjects.${index}`, {
                    ...current,
                    imageUrl: file ? URL.createObjectURL(file) : undefined,
                  })
                }}
                onRemove={() => {
                  const current = form.getValues("selectedProjects")
                  form.setValue(
                    "selectedProjects",
                    current.filter((_, i) => i !== index)
                  )
                }}
              />
            ))}
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
