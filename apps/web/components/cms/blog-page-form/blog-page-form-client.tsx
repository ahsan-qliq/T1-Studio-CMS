"use client"

import { useForm, Controller } from "react-hook-form"
import Link from "next/link"
import { LocalizedField, PlainField, ImageField, ButtonField, BoolField, SectionAccordion } from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { BlogPageApiData } from "@/types/api-blog-page"

export function BlogPageFormClient({ initialData }: { initialData: BlogPageApiData }) {
  const form = useForm<BlogPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState } = form
  const submit = handleSubmit(async (data) => {
    const response = await fetch("/api/save-blog-page", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (!response.ok) alert("Failed to save Blog page")
  })
  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-3">
          <PlainField control={control} name="pageName" label="Page Name" placeholder="Blog" />
          <PlainField control={control} name="slug" label="Slug" placeholder="blog" />
          <Controller control={control} name="status" render={({ field }) => <select {...field} className="h-9 rounded-md border border-zinc-200 px-2 text-sm"><option value="draft">draft</option><option value="published">published</option></select>} />
        </div>
        <Link href="/pages/blog-detail/new" className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium">Add new blog</Link>
      </div>
      <SectionAccordion title="Hero Banner" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen>
        <LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" />
        <LocalizedField control={control} name="sections.hero.heading" label="Heading" multiline />
        <LocalizedField control={control} name="sections.hero.description" label="Description" multiline />
        <ImageField control={control} name="sections.hero.backgroundImage" label="Background Image" />
        <ImageField control={control} name="sections.hero.mobileImage" label="Mobile Image" />
        <ButtonField control={control} name="sections.hero.primaryButton" label="Primary Button" />
        <PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
      </SectionAccordion>
      <SectionAccordion title="Blog Listing" order={2} control={control} visibleName="sections.blogListing.isVisible" defaultOpen>
        <LocalizedField control={control} name="sections.blogListing.eyebrow" label="Eyebrow" />
        <LocalizedField control={control} name="sections.blogListing.heading" label="Heading" />
        <LocalizedField control={control} name="sections.blogListing.description" label="Description" multiline />
        <BoolField control={control} name="sections.blogListing.enableCategoryFilter" label="Enable category filter" />
        <BoolField control={control} name="sections.blogListing.enableLoadMore" label="Enable load more" />
        <PlainField control={control} name="sections.blogListing.initialDisplayCount" label="Initial display count" type="number" />
        <PlainField control={control} name="sections.blogListing.loadMoreCount" label="Load more count" type="number" />
        <ButtonField control={control} name="sections.blogListing.loadMoreButton" label="Load More Button" />
      </SectionAccordion>
      <SeoFields control={control} namePrefix="seo" />
      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">{formState.isDirty ? "Save All Changes" : "Saved"}</button>
      </div>
    </form>
  )
}
