"use client"

import { Button } from "@workspace/ui/components/button"

import { useForm, Controller } from "react-hook-form"
import { LocalizedField, PlainField, ImageField, SectionAccordion, BoolField } from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"
import type { BlogDetailPageApiData } from "@/types/api-blog-detail-page"

export function BlogDetailFormClient({ initialData }: { initialData: BlogDetailPageApiData }) {
  const form = useForm<BlogDetailPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState } = form
  const submit = handleSubmit(async (data) => {
    const response = await fetch("/api/save-blog-detail-page", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    if (!response.ok) alert("Failed to save Blog detail page")
  })
  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="grid gap-4 md:grid-cols-12 md:items-start">
          <div className="md:col-span-6">
            <LocalizedField control={control} name="title" label="Title" />
          </div>
          <div className="md:col-span-2">
            <PlainField control={control} name="slug" label="Slug" placeholder="article-slug" required />
          </div>
          <div className="md:col-span-2">
            <PlainField control={control} name="category" label="Category" required />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label htmlFor="blog-detail-status" className="text-sm font-medium text-zinc-900">Status</label>
            <Controller control={control} name="status" render={({ field }) => <select id="blog-detail-status" {...field} className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"><option value="draft">draft</option><option value="published">published</option><option value="archived">archived</option></select>} />
          </div>
          <div className="md:col-span-6">
            <LocalizedField control={control} name="excerpt" label="Excerpt" multiline />
          </div>
          <div className="md:col-span-4">
            <ImageField control={control} name="featuredImage" label="Featured Image" />
          </div>
          <div className="flex items-center pt-8 md:col-span-2">
            <BoolField control={control} name="isFeatured" label="Featured article" />
          </div>
        </div>
      </div>
      <SectionAccordion title="Article Hero" order={1} control={control} visibleName="sections.hero.isVisible" defaultOpen>
        <LocalizedField control={control} name="sections.hero.eyebrow" label="Eyebrow" />
        <LocalizedField control={control} name="sections.hero.title" label="Title" />
        <LocalizedField control={control} name="sections.hero.excerpt" label="Excerpt" multiline />
        <ImageField control={control} name="sections.hero.backgroundImage" label="Background Image" />
        <ImageField control={control} name="sections.hero.mobileImage" label="Mobile Image" />
        <PlainField control={control} name="sections.hero.overlayOpacity" label="Overlay Opacity (%)" type="number" />
      </SectionAccordion>
      <SectionAccordion title="Article Content" order={2} control={control} visibleName="sections.articleContent.isVisible" defaultOpen>
        <LocalizedField control={control} name="sections.articleContent.intro" label="Introduction" multiline />
        <p className="text-xs text-zinc-500">Content blocks can be added through the backend model; this editor preserves existing blocks while exposing the article header and introduction.</p>
      </SectionAccordion>
      <SectionAccordion title="Author" order={3} control={control} visibleName="sections.authorInfo.isVisible">
        <LocalizedField control={control} name="sections.authorInfo.heading" label="Section Heading" />
        <LocalizedField control={control} name="author.name" label="Author Name" />
        <LocalizedField control={control} name="author.designation" label="Designation" />
        <LocalizedField control={control} name="author.bio" label="Bio" multiline />
        <ImageField control={control} name="author.image" label="Author Image" />
        <PlainField control={control} name="author.linkedinUrl" label="LinkedIn URL" />
        <PlainField control={control} name="author.websiteUrl" label="Website URL" />
      </SectionAccordion>
      <SeoFields control={control} namePrefix="seo" />
      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">{formState.isDirty ? "Save All Changes" : "Saved"}</Button>
      </div>
    </form>
  )
}
