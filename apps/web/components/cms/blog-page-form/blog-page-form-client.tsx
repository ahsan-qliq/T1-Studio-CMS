"use client"

import { useForm, Controller } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"
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
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_180px_auto] md:items-end">
          <PlainField control={control} name="pageName" label="Page Name" placeholder="Blog" />
          <PlainField control={control} name="slug" label="Slug" placeholder="blog" />
          <div className="space-y-1.5">
            <label htmlFor="blog-status" className="text-sm font-medium text-zinc-900">Status</label>
            <Controller control={control} name="status" render={({ field }) => <select id="blog-status" {...field} className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"><option value="draft">draft</option><option value="published">published</option></select>} />
          </div>
          <Link href="/pages/blog-detail/new" className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50">Add new blog</Link>
        </div>
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
        <Button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">{formState.isDirty ? "Save All Changes" : "Saved"}</Button>
      </div>
    </form>
  )
}
