"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { useFormSync } from "@/hooks/use-form-sync"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Input } from "@workspace/ui/components/input"
import { SectionField } from "../shared/section-field"
import { DeleteButton } from "../shared/delete-button"
import { AddItemButton } from "../shared/add-item-button"
import { FooterLinkColumnCard } from "./footer-link-column-card"
import type { FooterContent, Language } from "@/types/cms"

// ─── Schema ──────────────────────────────────────────────────────────────────

const linkSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
})

const columnSchema = z.object({
  id: z.string(),
  number: z.string(),
  titleEn: z.string(),
  titleAr: z.string(),
  links: z.array(linkSchema),
})

const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.enum(["Facebook", "Instagram", "X", "LinkedIn", "YouTube"]),
  url: z.string(),
})

const hoursRowSchema = z.object({
  id: z.string(),
  daysEn: z.string(),
  daysAr: z.string(),
  hoursEn: z.string(),
  hoursAr: z.string(),
})

const legalLinkSchema = z.object({
  id: z.string(),
  labelEn: z.string(),
  labelAr: z.string(),
  href: z.string(),
})

const footerSchema = z.object({
  newsletterHeadingEn: z.string(),
  newsletterHeadingAr: z.string(),
  newsletterSubtextEn: z.string(),
  newsletterSubtextAr: z.string(),
  newsletterPlaceholderEn: z.string(),
  newsletterPlaceholderAr: z.string(),
  newsletterButtonLabelEn: z.string(),
  newsletterButtonLabelAr: z.string(),
  brandDescriptionEn: z.string(),
  brandDescriptionAr: z.string(),
  socialLinks: z.array(socialLinkSchema),
  linkColumns: z.array(columnSchema),
  openingHoursHeadingEn: z.string(),
  openingHoursHeadingAr: z.string(),
  hoursRows: z.array(hoursRowSchema),
  showroomHeadingEn: z.string(),
  showroomHeadingAr: z.string(),
  showroomAddressEn: z.string(),
  showroomAddressAr: z.string(),
  showroomPhone: z.string(),
  showroomEmail: z.string(),
  showroomDirectionsUrl: z.string(),
  showroomDirectionsLabelEn: z.string(),
  showroomDirectionsLabelAr: z.string(),
  copyrightTextEn: z.string(),
  copyrightTextAr: z.string(),
  legalLinks: z.array(legalLinkSchema),
})

export type FooterFormValues = z.infer<typeof footerSchema>

// ─── Component ───────────────────────────────────────────────────────────────

interface FooterContentTabProps {
  content: FooterContent
  language: Language
  onChange: (content: FooterContent) => void
}

export function FooterContentTab({ content, language, onChange }: FooterContentTabProps) {
  const isEn = language === "en"

  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerSchema),
    defaultValues: content,
  })

  const {
    fields: columnFields,
    append: appendColumn,
    remove: removeColumn,
  } = useFieldArray({ control: form.control, name: "linkColumns" })

  const {
    fields: hoursFields,
    append: appendHoursRow,
    remove: removeHoursRow,
  } = useFieldArray({ control: form.control, name: "hoursRows" })

  const {
    fields: legalFields,
    append: appendLegalLink,
    remove: removeLegalLink,
  } = useFieldArray({ control: form.control, name: "legalLinks" })

  useFormSync(form, onChange)

  const addColumn = () => {
    const nextNum = String(columnFields.length + 1).padStart(2, "0")
    appendColumn({
      id: `fcol-${Date.now()}`,
      number: nextNum,
      titleEn: "",
      titleAr: "",
      links: [],
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-8 px-5 py-5" noValidate>
        {/* ── Newsletter ─────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900">Newsletter</h3>
          <div className="grid grid-cols-2 gap-4">
            <SectionField
              control={form.control}
              name={isEn ? "newsletterHeadingEn" : "newsletterHeadingAr"}
              label="Heading"
              isRtl={!isEn}
              placeholder={isEn ? "Stay In Loop" : "ابقَ على اطلاع"}
            />
            <SectionField
              control={form.control}
              name={isEn ? "newsletterButtonLabelEn" : "newsletterButtonLabelAr"}
              label="Button Label"
              isRtl={!isEn}
              placeholder={isEn ? "Submit" : "إرسال"}
            />
          </div>
          <SectionField
            control={form.control}
            name={isEn ? "newsletterSubtextEn" : "newsletterSubtextAr"}
            label="Subtext"
            isRtl={!isEn}
            multiline
            placeholder="Be the first to know about our exclusive offers..."
          />
          <SectionField
            control={form.control}
            name={isEn ? "newsletterPlaceholderEn" : "newsletterPlaceholderAr"}
            label="Input Placeholder"
            isRtl={!isEn}
            placeholder={isEn ? "Enter your email" : "أدخل بريدك الإلكتروني"}
          />
        </div>

        {/* ── Brand & social ─────────────────────────────────────────── */}
        <div className="space-y-4 border-t border-zinc-100 pt-6">
          <h3 className="text-sm font-semibold text-zinc-900">Brand &amp; Social</h3>
          <SectionField
            control={form.control}
            name={isEn ? "brandDescriptionEn" : "brandDescriptionAr"}
            label="Brand Description"
            isRtl={!isEn}
            multiline
            placeholder="Short description shown under the logo"
          />
          <div>
            <p className="mb-2 text-xs font-medium text-zinc-600">Social Links</p>
            <div className="space-y-2">
              {form.watch("socialLinks").map((social, index) => (
                <div key={social.id} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs font-medium text-zinc-500">
                    {social.platform}
                  </span>
                  <Input
                    {...form.register(`socialLinks.${index}.url`)}
                    placeholder={`https://${social.platform.toLowerCase()}.com/yourpage`}
                    aria-label={`${social.platform} URL`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Link columns ───────────────────────────────────────────── */}
        <div className="border-t border-zinc-100 pt-6">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-900">Link Columns</h3>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {columnFields.length} items
            </span>
            <button
              type="button"
              onClick={addColumn}
              className="ml-auto flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <Plus className="size-3.5" aria-hidden />
              Add Column
            </button>
          </div>

          <div role="list" aria-label="Footer link columns" className="space-y-4">
            {columnFields.map((col, colIndex) => (
              <div key={col.id} role="listitem">
                <FooterLinkColumnCard
                  colIndex={colIndex}
                  language={language}
                  control={form.control}
                  register={form.register}
                  onRemoveColumn={() => removeColumn(colIndex)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Opening hours ──────────────────────────────────────────── */}
        <div className="space-y-4 border-t border-zinc-100 pt-6">
          <h3 className="text-sm font-semibold text-zinc-900">Opening Hours</h3>
          <SectionField
            control={form.control}
            name={isEn ? "openingHoursHeadingEn" : "openingHoursHeadingAr"}
            label="Section Heading"
            isRtl={!isEn}
            placeholder={isEn ? "Opening Hours" : "ساعات العمل"}
          />
          <div className="space-y-3">
            {hoursFields.map((row, rowIndex) => (
              <div
                key={row.id}
                className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
              >
                <div className="grid flex-1 grid-cols-2 gap-3">
                  <SectionField
                    control={form.control}
                    name={isEn ? `hoursRows.${rowIndex}.daysEn` : `hoursRows.${rowIndex}.daysAr`}
                    label="Days"
                    isRtl={!isEn}
                    placeholder={isEn ? "Mon – Fri" : "الإثنين - الجمعة"}
                  />
                  <SectionField
                    control={form.control}
                    name={isEn ? `hoursRows.${rowIndex}.hoursEn` : `hoursRows.${rowIndex}.hoursAr`}
                    label="Hours"
                    isRtl={!isEn}
                    placeholder={isEn ? "8am – 6pm" : "٨ص - ٦م"}
                  />
                </div>
                <DeleteButton
                  onClick={() => removeHoursRow(rowIndex)}
                  ariaLabel={`Delete hours row ${rowIndex + 1}`}
                  className="mt-6"
                />
              </div>
            ))}
          </div>
          <AddItemButton
            label="Add Row"
            onClick={() =>
              appendHoursRow({ id: `hr-${Date.now()}`, daysEn: "", daysAr: "", hoursEn: "", hoursAr: "" })
            }
          />
        </div>

        {/* ── Showroom ───────────────────────────────────────────────── */}
        <div className="space-y-4 border-t border-zinc-100 pt-6">
          <h3 className="text-sm font-semibold text-zinc-900">Showroom</h3>
          <SectionField
            control={form.control}
            name={isEn ? "showroomHeadingEn" : "showroomHeadingAr"}
            label="Section Heading"
            isRtl={!isEn}
            placeholder={isEn ? "Showroom" : "صالة العرض"}
          />
          <SectionField
            control={form.control}
            name={isEn ? "showroomAddressEn" : "showroomAddressAr"}
            label="Address"
            isRtl={!isEn}
            multiline
            placeholder="Showroom 1, MSM 2 Building, Exit 44, Sheikh Zayed Road, Dubai"
          />
          <div className="grid grid-cols-2 gap-4">
            <SectionField
              control={form.control}
              name="showroomPhone"
              label="Phone"
              placeholder="+971 4 2386 488"
            />
            <SectionField
              control={form.control}
              name="showroomEmail"
              label="Email"
              placeholder="info@tonestudios.com"
            />
          </div>
          <SectionField
            control={form.control}
            name="showroomDirectionsUrl"
            label="Directions URL"
            placeholder="https://maps.google.com/..."
          />
          <SectionField
            control={form.control}
            name={isEn ? "showroomDirectionsLabelEn" : "showroomDirectionsLabelAr"}
            label="Directions Link Label"
            isRtl={!isEn}
            placeholder={isEn ? "Get direction to showroom" : "احصل على الاتجاهات"}
          />
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="space-y-4 border-t border-zinc-100 pt-6">
          <h3 className="text-sm font-semibold text-zinc-900">Bottom Bar</h3>
          <SectionField
            control={form.control}
            name={isEn ? "copyrightTextEn" : "copyrightTextAr"}
            label="Copyright Text"
            isRtl={!isEn}
            placeholder={isEn ? "© 2026 Prism. All rights reserved." : "© 2026 بريزم. جميع الحقوق محفوظة."}
          />

          <div>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-xs font-medium text-zinc-600">Legal Links</p>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                {legalFields.length} items
              </span>
            </div>
            <div className="space-y-3">
              {legalFields.map((link, linkIndex) => (
                <div
                  key={link.id}
                  className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
                >
                  <div className="flex-1 space-y-2">
                    <SectionField
                      control={form.control}
                      name={isEn ? `legalLinks.${linkIndex}.labelEn` : `legalLinks.${linkIndex}.labelAr`}
                      label="Label"
                      isRtl={!isEn}
                      placeholder={isEn ? "Privacy" : "الخصوصية"}
                    />
                    <SectionField
                      control={form.control}
                      name={`legalLinks.${linkIndex}.href`}
                      label="URL"
                      placeholder="/privacy"
                    />
                  </div>
                  <DeleteButton
                    onClick={() => removeLegalLink(linkIndex)}
                    ariaLabel={`Delete legal link ${linkIndex + 1}`}
                    className="mt-6"
                  />
                </div>
              ))}
            </div>
            <div className="mt-3">
              <AddItemButton
                label="Add Legal Link"
                onClick={() =>
                  appendLegalLink({ id: `leg-${Date.now()}`, labelEn: "", labelAr: "", href: "" })
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
