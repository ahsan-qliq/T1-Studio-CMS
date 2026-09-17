"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"

import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form"

import {
  LocalizedField,
  PlainField,
  BoolField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
} from "../home-page-form/shared-fields"

import { SeoFields } from "../form-shared/seo-field"

import type { BlogPageApiData } from "@/types/api-blog-page"

const tempId = () => `tmp-${Math.random().toString(36).slice(2, 10)}`

/* ============================================================
   MAIN FORM
============================================================ */

export function BlogPageFormClient({
  initialData,
}: {
  initialData: BlogPageApiData
}) {
  const form = useForm<BlogPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState } = form

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-blog-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }
    } catch (error) {
      console.error(error)
      alert("Failed to save Blog page")
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      {/* =====================================================
          PAGE SETTINGS
      ===================================================== */}

      <div className="grid grid-cols-3 gap-3 rounded-lg border border-zinc-200 bg-white p-4">
        <PlainField
          control={control}
          name="pageName"
          label="Page Name"
          placeholder="Blog"
        />

        <PlainField
          control={control}
          name="slug"
          label="Slug"
          placeholder="blog"
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <div className="space-y-1.5">
              <Label>Status</Label>

              <select
                {...field}
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"
              >
                <option value="draft">draft</option>

                <option value="published">published</option>
              </select>
            </div>
          )}
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <HeroSection control={control} />

      {/* =====================================================
          BLOG LISTING
      ===================================================== */}

      <BlogListingSection control={control} />

      {/* =====================================================
          PARTNERSHIP
      ===================================================== */}

      <PartnershipSection control={control} />

      {/* =====================================================
          FAQ
      ===================================================== */}

      <FaqSection control={control} />

      {/* =====================================================
          SEO
      ===================================================== */}

      <SeoFields control={control} namePrefix="seo" />

      {/* =====================================================
          SAVE
      ===================================================== */}

      <div className="fixed inset-x-0 bottom-0 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : formState.isDirty
              ? "Save All Changes"
              : "Saved"}
        </Button>
      </div>
    </form>
  )
}

/* ============================================================
   HERO
============================================================ */

function HeroSection({ control }: { control: Control<BlogPageApiData> }) {
  return (
    <SectionAccordion title="Hero" order={1} control={control} defaultOpen>
      <LocalizedField
        control={control}
        name="sections.hero.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.hero.heading"
        label="Heading"
        multiline
      />

      <LocalizedField
        control={control}
        name="sections.hero.description"
        label="Description"
        multiline
      />

      <BlogImageField
        control={control}
        name="sections.hero.backgroundImage"
        label="Background Image"
      />

      <PlainField
        control={control}
        name="sections.hero.overlayOpacity"
        label="Overlay Opacity"
        type="number"
      />

      <BlogButtonField
        control={control}
        name="sections.hero.primaryButton"
        label="Primary Button"
      />
    </SectionAccordion>
  )
}

/* ============================================================
   BLOG LISTING
============================================================ */

function BlogListingSection({
  control,
}: {
  control: Control<BlogPageApiData>
}) {
  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "sections.blogListing.categories",
  })

  const {
    fields: articleFields,
    append: appendArticle,
    remove: removeArticle,
  } = useFieldArray({
    control,
    name: "sections.blogListing.articles",
  })

  return (
    <SectionAccordion
      title="Blog Listing"
      order={2}
      control={control}
      defaultOpen
    >
      {/* =====================================================
          SETTINGS
      ===================================================== */}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <BoolField
            control={control}
            name="sections.blogListing.enableCategoryFilter"
            label="Enable Category Filter"
          />

          <BoolField
            control={control}
            name="sections.blogListing.enableLoadMore"
            label="Enable Load More"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PlainField
            control={control}
            name="sections.blogListing.initialDisplayCount"
            label="Initial Display Count"
            type="number"
          />

          <PlainField
            control={control}
            name="sections.blogListing.loadMoreCount"
            label="Load More Count"
            type="number"
          />
        </div>
      </div>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <div className="space-y-3 border-t border-zinc-200 pt-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Categories</h3>

          <p className="text-xs text-zinc-500">
            Add categories used by the blog filter.
          </p>
        </div>

        {categoryFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <PlainField
                  control={control}
                  name={`sections.blogListing.categories.${index}.key`}
                  label="Category Key"
                  placeholder="design"
                />

                <LocalizedField
                  control={control}
                  name={`sections.blogListing.categories.${index}.label`}
                  label="Category Label"
                />
              </div>

              <DeleteItemButton onClick={() => removeCategory(index)} />
            </div>
          </div>
        ))}

        <AddItemButton
          label="Add Category"
          onClick={() =>
            appendCategory({
              key: "",
              label: {
                en: "",
                ar: "",
              },
            })
          }
        />
      </div>

      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}

      <div className="space-y-4 border-t border-zinc-200 pt-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Featured Article
          </h3>

          <p className="text-xs text-zinc-500">
            Configure the main featured article shown above the blog list.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <PlainField
                control={control}
                name="sections.blogListing.featuredArticle.blogSlug"
                label="Blog Slug"
              />

              <PlainField
                control={control}
                name="sections.blogListing.featuredArticle.categoryKey"
                label="Category Key"
                placeholder="design"
              />

              <PlainField
                control={control}
                name="sections.blogListing.featuredArticle.href"
                label="Article URL"
                placeholder="/blog/article-slug"
              />
            </div>

            <LocalizedField
              control={control}
              name="sections.blogListing.featuredArticle.title"
              label="Title"
            />

            <LocalizedField
              control={control}
              name="sections.blogListing.featuredArticle.excerpt"
              label="Excerpt"
              multiline
            />

            <BlogImageField
              control={control}
              name="sections.blogListing.featuredArticle.image"
              label="Featured Image"
            />

            <div className="grid grid-cols-2 gap-4">
              <BoolField
                control={control}
                name="sections.blogListing.featuredArticle.featured"
                label="Featured"
              />

              <BoolField
                control={control}
                name="sections.blogListing.featuredArticle.isVisible"
                label="Visible"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ARTICLES
      ===================================================== */}

      <div className="space-y-3 border-t border-zinc-200 pt-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Articles</h3>

          <p className="text-xs text-zinc-500">Add and manage blog articles.</p>
        </div>

        {articleFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                {/* Basic */}

                <div className="grid grid-cols-3 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.blogListing.articles.${index}.blogSlug`}
                    label="Blog Slug"
                    placeholder="how-to-choose-colour-palette"
                  />

                  <PlainField
                    control={control}
                    name={`sections.blogListing.articles.${index}.categoryKey`}
                    label="Category Key"
                    placeholder="tips"
                  />

                  <PlainField
                    control={control}
                    name={`sections.blogListing.articles.${index}.href`}
                    label="Article URL"
                    placeholder="/blog/article-slug"
                  />
                </div>

                {/* Title */}

                <LocalizedField
                  control={control}
                  name={`sections.blogListing.articles.${index}.title`}
                  label="Title"
                />

                {/* Excerpt */}

                <LocalizedField
                  control={control}
                  name={`sections.blogListing.articles.${index}.excerpt`}
                  label="Excerpt"
                  multiline
                />

                {/* Category */}

                <LocalizedField
                  control={control}
                  name={`sections.blogListing.articles.${index}.category`}
                  label="Category"
                />

                {/* Author */}

                <LocalizedField
                  control={control}
                  name={`sections.blogListing.articles.${index}.author`}
                  label="Author"
                />

                {/* Read Time */}

                <LocalizedField
                  control={control}
                  name={`sections.blogListing.articles.${index}.readTime`}
                  label="Read Time"
                />

                {/* Published Date */}

                <PlainField
                  control={control}
                  name={`sections.blogListing.articles.${index}.publishedDate`}
                  label="Published Date"
                  type="date"
                />

                {/* Image */}

                <BlogImageField
                  control={control}
                  name={`sections.blogListing.articles.${index}.image`}
                  label="Article Image"
                />

                {/* Flags */}

                <div className="grid grid-cols-2 gap-4">
                  <BoolField
                    control={control}
                    name={`sections.blogListing.articles.${index}.featured`}
                    label="Featured"
                  />

                  <BoolField
                    control={control}
                    name={`sections.blogListing.articles.${index}.isVisible`}
                    label="Visible"
                  />
                </div>
              </div>

              <DeleteItemButton onClick={() => removeArticle(index)} />
            </div>
          </div>
        ))}

        <AddItemButton
          label="Add Article"
          onClick={() =>
            appendArticle({
              blogSlug: "",
              title: {
                en: "",
                ar: "",
              },
              excerpt: {
                en: "",
                ar: "",
              },
              category: {
                en: "",
                ar: "",
              },
              categoryKey: "",
              author: {
                en: "",
                ar: "",
              },
              readTime: {
                en: "",
                ar: "",
              },
              publishedDate: "",
              image: {
                src: "",
                alt: {
                  en: "",
                  ar: "",
                },
              },
              href: "",
              featured: false,
              isVisible: true,
            })
          }
        />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   PARTNERSHIP
============================================================ */

function PartnershipSection({
  control,
}: {
  control: Control<BlogPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.partnership.items",
  })

  return (
    <SectionAccordion title="Partnership" order={3} control={control}>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <PlainField
                  control={control}
                  name={`sections.partnership.items.${index}.icon`}
                  label="Icon"
                  placeholder="handshake"
                />

                <LocalizedField
                  control={control}
                  name={`sections.partnership.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.partnership.items.${index}.description`}
                  label="Description"
                  multiline
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add Partnership Item"
        onClick={() =>
          append({
            icon: "",
            title: {
              en: "",
              ar: "",
            },
            description: {
              en: "",
              ar: "",
            },
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   FAQ
============================================================ */

function FaqSection({ control }: { control: Control<BlogPageApiData> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.faq.items",
  })

  return (
    <SectionAccordion title="FAQ" order={4} control={control}>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <LocalizedField
                  control={control}
                  name={`sections.faq.items.${index}.question`}
                  label="Question"
                  multiline
                />

                <LocalizedField
                  control={control}
                  name={`sections.faq.items.${index}.answer`}
                  label="Answer"
                  multiline
                />

                <BoolField
                  control={control}
                  name={`sections.faq.items.${index}.isVisible`}
                  label="Visible"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>

      <AddItemButton
        label="Add FAQ"
        onClick={() =>
          append({
            question: {
              en: "",
              ar: "",
            },
            answer: {
              en: "",
              ar: "",
            },
            isVisible: true,
          })
        }
      />
    </SectionAccordion>
  )
}

/* ============================================================
   BLOG IMAGE FIELD
============================================================ */

function BlogImageField({
  control,
  name,
  label,
}: {
  control: Control<BlogPageApiData>
  name: string
  label: string
}) {
  return (
    <div className="space-y-3 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
      <p className="text-xs font-medium text-zinc-600">{label}</p>

      <PlainField
        control={control}
        name={`${name}.src`}
        label="Image URL"
        placeholder="https://cdn.example.com/image.jpg"
      />

      <LocalizedField control={control} name={`${name}.alt`} label="Alt Text" />
    </div>
  )
}

/* ============================================================
   BLOG BUTTON FIELD
============================================================ */

function BlogButtonField({
  control,
  name,
  label,
}: {
  control: Control<BlogPageApiData>
  name: string
  label: string
}) {
  return (
    <div className="space-y-3 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
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
          placeholder="/blog"
        />

        <div className="pb-2">
          <BoolField
            control={control}
            name={`${name}.openInNewTab`}
            label="New Tab"
          />
        </div>
      </div>
    </div>
  )
}
