"use client"

import { SectionAccordion } from "../home-page-form/shared-fields"
import { SeoFields } from "./seo-field"

/**
 * Drop-in SEO / metadata accordion for any page-level form.
 *
 * Usage:
 *   <PageMetadataSection control={control} order={15} />
 *
 * Props:
 *   control     — react-hook-form Control from the parent useForm()
 *   order       — badge number shown in the accordion header (e.g. 15)
 *   namePrefix  — path to the seo object in the form schema (default: "seo")
 *   renderOgImage — optional override for the OG image field; pass when the
 *                   form stores images as `{ src, alt }` instead of the
 *                   default `{ url, key, alt }` shape (e.g. blog-detail)
 */
export function PageMetadataSection({
  control,
  order,
  namePrefix = "seo",
  renderOgImage,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  order: number
  namePrefix?: string
  renderOgImage?: (props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any
    name: string
    label: string
  }) => React.ReactNode
}) {
  return (
    <SectionAccordion title="Page Metadata" order={order} control={control}>
      <SeoFields
        control={control}
        namePrefix={namePrefix}
        renderOgImage={renderOgImage}
      />
    </SectionAccordion>
  )
}
