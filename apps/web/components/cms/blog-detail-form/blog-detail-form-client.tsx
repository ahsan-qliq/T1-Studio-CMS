"use client"

import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
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

import type {
  BlogContentBlock,
  BlogDetailPageApiData,
} from "@/types/api-blog-detail-page"

/* ============================================================
   MAIN FORM
============================================================ */

export function BlogDetailFormClient({
  initialData,
}: {
  initialData: BlogDetailPageApiData
}) {
  const form = useForm<BlogDetailPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState } = form

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-blog-detail-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      alert("Blog detail saved successfully")
    } catch (error) {
      console.error(error)
      alert("Failed to save Blog detail page")
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      {/* =====================================================
          BASIC BLOG INFORMATION
      ===================================================== */}

      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-zinc-900">
            Blog Information
          </h2>

          <p className="text-xs text-zinc-500">
            Basic information for this blog article.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <PlainField
              control={control}
              name="slug"
              label="Slug"
              placeholder="top-kitchen-trends-2026"
              required
            />

            <PlainField
              control={control}
              name="category"
              label="Category"
              placeholder="design"
              required
            />

            <PlainField
              control={control}
              name="publishedAt"
              label="Published At"
              type="datetime-local"
            />
          </div>

          <LocalizedField control={control} name="title" label="Title" />

          <LocalizedField
            control={control}
            name="excerpt"
            label="Excerpt"
            multiline
          />

          <LocalizedField
            control={control}
            name="categoryLabel"
            label="Category Label"
          />

          <LocalizedField control={control} name="readTime" label="Read Time" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StatusField control={control} />

            <BoolField
              control={control}
              name="isFeatured"
              label="Featured Blog"
            />
          </div>

          <BlogImageField
            control={control}
            name="featuredImage"
            label="Featured Image"
          />

          <TagsField control={control} />
        </div>
      </div>

      {/* =====================================================
          AUTHOR
      ===================================================== */}

      <AuthorSection
        control={control}
        namePrefix="author"
        title="Author"
        order={1}
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <HeroSection control={control} />

      {/* =====================================================
          ARTICLE CONTENT
      ===================================================== */}

      <ArticleContentSection control={control} />

      {/* =====================================================
          CONSULTATION
      ===================================================== */}

      <ConsultationSection control={control} />

      {/* =====================================================
          RELATED ARTICLES
      ===================================================== */}

      <RelatedArticlesSection control={control} />

      {/* =====================================================
          AUTHOR INFO
      ===================================================== */}

      <AuthorInfoSection control={control} />

      {/* =====================================================
          SEO
      ===================================================== */}

      <BlogDetailSeoSection control={control} />

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
   STATUS
============================================================ */

function StatusField({ control }: { control: Control<BlogDetailPageApiData> }) {
  return (
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
            <option value="archived">archived</option>
          </select>
        </div>
      )}
    />
  )
}

/* ============================================================
   TAGS
============================================================ */

function TagsField({ control }: { control: Control<BlogDetailPageApiData> }) {
  return (
    <div className="space-y-3 rounded-md border border-zinc-100 bg-zinc-50/60 p-3">
      <div>
        <p className="text-xs font-medium text-zinc-700">Tags</p>

        <p className="text-xs text-zinc-500">Enter comma-separated tags.</p>
      </div>

      <Controller
        control={control}
        name="tags.en"
        render={({ field }) => (
          <div className="space-y-1.5">
            <Label>Tags EN</Label>

            <Input
              value={(field.value ?? []).join(", ")}
              onChange={(event) => {
                field.onChange(
                  event.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean)
                )
              }}
              placeholder="kitchen, trends, 2026"
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="tags.ar"
        render={({ field }) => (
          <div className="space-y-1.5">
            <Label>Tags AR</Label>

            <Input
              value={(field.value ?? []).join(", ")}
              onChange={(event) => {
                field.onChange(
                  event.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean)
                )
              }}
              placeholder="مطبخ, اتجاهات"
            />
          </div>
        )}
      />
    </div>
  )
}

/* ============================================================
   HERO
============================================================ */

function HeroSection({ control }: { control: Control<BlogDetailPageApiData> }) {
  return (
    <SectionAccordion title="Hero" order={2} control={control} defaultOpen>
      <LocalizedField
        control={control}
        name="sections.hero.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.hero.title"
        label="Title"
      />

      <LocalizedField
        control={control}
        name="sections.hero.excerpt"
        label="Excerpt"
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
    </SectionAccordion>
  )
}

/* ============================================================
   ARTICLE CONTENT
============================================================ */

function ArticleContentSection({
  control,
}: {
  control: Control<BlogDetailPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.articleContent.blocks",
  })

  const addBlock = (block: BlogContentBlock) => {
    append(block)
  }

  return (
    <SectionAccordion
      title="Article Content"
      order={3}
      control={control}
      defaultOpen
    >
      <LocalizedField
        control={control}
        name="sections.articleContent.intro"
        label="Introduction"
        multiline
      />

      <div className="space-y-4 border-t border-zinc-200 pt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Content Blocks
            </h3>

            <p className="text-xs text-zinc-500">
              Build the article using headings, paragraphs, images, lists and
              quotes.
            </p>
          </div>
        </div>

        {fields.map((field, index) => (
          <ContentBlockEditor
            key={field.id}
            control={control}
            index={index}
            onRemove={() => remove(index)}
          />
        ))}

        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          <AddItemButton
            label="Add Heading"
            onClick={() =>
              addBlock({
                type: "heading",
                level: 2,
                heading: {
                  en: "",
                  ar: "",
                },
              })
            }
          />

          <AddItemButton
            label="Add Paragraph"
            onClick={() =>
              addBlock({
                type: "paragraph",
                content: {
                  en: "",
                  ar: "",
                },
              })
            }
          />

          <AddItemButton
            label="Add Image"
            onClick={() =>
              addBlock({
                type: "image",
                image: {
                  src: "",
                  alt: {
                    en: "",
                    ar: "",
                  },
                },
                caption: {
                  en: "",
                  ar: "",
                },
              })
            }
          />

          <AddItemButton
            label="Add List"
            onClick={() =>
              addBlock({
                type: "list",
                listStyle: "bullet",
                listItems: [],
              })
            }
          />

          <AddItemButton
            label="Add Quote"
            onClick={() =>
              addBlock({
                type: "quote",
                content: {
                  en: "",
                  ar: "",
                },
              })
            }
          />
        </div>
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   CONTENT BLOCK EDITOR
============================================================ */

function ContentBlockEditor({
  control,
  index,
  onRemove,
}: {
  control: Control<BlogDetailPageApiData>
  index: number
  onRemove: () => void
}) {
  const type = useWatch({
    control,
    name: `sections.articleContent.blocks.${index}.type`,
  })

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Block {index + 1}
          </p>

          <p className="text-xs text-zinc-500 capitalize">{type}</p>
        </div>

        <DeleteItemButton onClick={onRemove} />
      </div>

      <div className="space-y-4">
        <Controller
          control={control}
          name={`sections.articleContent.blocks.${index}.type`}
          render={({ field }) => (
            <div className="space-y-1.5">
              <Label>Block Type</Label>

              <select
                {...field}
                className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm"
              >
                <option value="heading">Heading</option>
                <option value="paragraph">Paragraph</option>
                <option value="image">Image</option>
                <option value="list">List</option>
                <option value="quote">Quote</option>
              </select>
            </div>
          )}
        />

        {type === "heading" && <HeadingBlock control={control} index={index} />}

        {type === "paragraph" && (
          <ParagraphBlock control={control} index={index} />
        )}

        {type === "image" && <ImageBlock control={control} index={index} />}

        {type === "list" && <ListBlock control={control} index={index} />}

        {type === "quote" && <QuoteBlock control={control} index={index} />}
      </div>
    </div>
  )
}

/* ============================================================
   HEADING BLOCK
============================================================ */

function HeadingBlock({
  control,
  index,
}: {
  control: Control<BlogDetailPageApiData>
  index: number
}) {
  return (
    <>
      <PlainField
        control={control}
        name={`sections.articleContent.blocks.${index}.level`}
        label="Heading Level"
        type="number"
      />

      <LocalizedField
        control={control}
        name={`sections.articleContent.blocks.${index}.heading`}
        label="Heading"
      />
    </>
  )
}

/* ============================================================
   PARAGRAPH BLOCK
============================================================ */

function ParagraphBlock({
  control,
  index,
}: {
  control: Control<BlogDetailPageApiData>
  index: number
}) {
  return (
    <LocalizedField
      control={control}
      name={`sections.articleContent.blocks.${index}.content`}
      label="Paragraph"
      multiline
    />
  )
}

/* ============================================================
   IMAGE BLOCK
============================================================ */

function ImageBlock({
  control,
  index,
}: {
  control: Control<BlogDetailPageApiData>
  index: number
}) {
  return (
    <>
      <BlogImageField
        control={control}
        name={`sections.articleContent.blocks.${index}.image`}
        label="Image"
      />

      <LocalizedField
        control={control}
        name={`sections.articleContent.blocks.${index}.caption`}
        label="Caption"
      />
    </>
  )
}

/* ============================================================
   LIST BLOCK
============================================================ */

function ListBlock({
  control,
  index,
}: {
  control: Control<BlogDetailPageApiData>
  index: number
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.articleContent.blocks.${index}.listItems`,
  })

  return (
    <>
      <Controller
        control={control}
        name={`sections.articleContent.blocks.${index}.listStyle`}
        render={({ field }) => (
          <div className="space-y-1.5">
            <Label>List Style</Label>

            <select
              {...field}
              className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm"
            >
              <option value="bullet">Bullet</option>
              <option value="number">Number</option>
            </select>
          </div>
        )}
      />

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-zinc-800">List Items</p>
        </div>

        {fields.map((field, itemIndex) => (
          <div
            key={field.id}
            className="rounded-md border border-zinc-100 bg-zinc-50 p-3"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <LocalizedField
                  control={control}
                  name={`sections.articleContent.blocks.${index}.listItems.${itemIndex}`}
                  label={`Item ${itemIndex + 1}`}
                />
              </div>

              <DeleteItemButton onClick={() => remove(itemIndex)} />
            </div>
          </div>
        ))}

        <AddItemButton
          label="Add List Item"
          onClick={() =>
            append({
              en: "",
              ar: "",
            })
          }
        />
      </div>
    </>
  )
}

/* ============================================================
   QUOTE BLOCK
============================================================ */

function QuoteBlock({
  control,
  index,
}: {
  control: Control<BlogDetailPageApiData>
  index: number
}) {
  return (
    <LocalizedField
      control={control}
      name={`sections.articleContent.blocks.${index}.content`}
      label="Quote"
      multiline
    />
  )
}

/* ============================================================
   CONSULTATION
============================================================ */

function ConsultationSection({
  control,
}: {
  control: Control<BlogDetailPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.consultation.formFields",
  })

  return (
    <SectionAccordion title="Consultation" order={4} control={control}>
      <LocalizedField
        control={control}
        name="sections.consultation.eyebrow"
        label="Eyebrow"
      />

      <LocalizedField
        control={control}
        name="sections.consultation.heading"
        label="Heading"
      />

      <LocalizedField
        control={control}
        name="sections.consultation.description"
        label="Description"
        multiline
      />

      <BlogImageField
        control={control}
        name="sections.consultation.image"
        label="Consultation Image"
      />

      <LocalizedField
        control={control}
        name="sections.consultation.submitButtonLabel"
        label="Submit Button Label"
      />

      <div className="space-y-4 border-t border-zinc-200 pt-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Form Fields</h3>

          <p className="text-xs text-zinc-500">
            Configure the fields shown in the consultation form.
          </p>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <PlainField
                    control={control}
                    name={`sections.consultation.formFields.${index}.name`}
                    label="Name"
                    placeholder="name"
                  />

                  <PlainField
                    control={control}
                    name={`sections.consultation.formFields.${index}.type`}
                    label="Type"
                    placeholder="text"
                  />

                  <BoolField
                    control={control}
                    name={`sections.consultation.formFields.${index}.required`}
                    label="Required"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.consultation.formFields.${index}.label`}
                  label="Label"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}

        <AddItemButton
          label="Add Form Field"
          onClick={() =>
            append({
              name: "",
              type: "text",
              label: {
                en: "",
                ar: "",
              },
              required: false,
            })
          }
        />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   RELATED ARTICLES
============================================================ */

function RelatedArticlesSection({
  control,
}: {
  control: Control<BlogDetailPageApiData>
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections.relatedArticles.items",
  })

  return (
    <SectionAccordion title="Related Articles" order={5} control={control}>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Related Blogs</h3>

          <p className="text-xs text-zinc-500">
            Add blogs that should appear below the article.
          </p>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-200 bg-white p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <PlainField
                    control={control}
                    name={`sections.relatedArticles.items.${index}.blogSlug`}
                    label="Blog Slug"
                    placeholder="how-to-choose-colour-palette"
                  />

                  <PlainField
                    control={control}
                    name={`sections.relatedArticles.items.${index}.href`}
                    label="URL"
                    placeholder="/blog/how-to-choose-colour-palette"
                  />

                  <LocalizedField
                    control={control}
                    name={`sections.relatedArticles.items.${index}.readTime`}
                    label="Read Time"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.category`}
                  label="Category"
                />

                <BlogImageField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.image`}
                  label="Image"
                />
              </div>

              <DeleteItemButton onClick={() => remove(index)} />
            </div>
          </div>
        ))}

        <AddItemButton
          label="Add Related Article"
          onClick={() =>
            append({
              blogSlug: "",
              title: {
                en: "",
                ar: "",
              },
              category: {
                en: "",
                ar: "",
              },
              readTime: {
                en: "",
                ar: "",
              },
              image: {
                src: "",
                alt: {
                  en: "",
                  ar: "",
                },
              },
              href: "",
            })
          }
        />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   AUTHOR INFO
============================================================ */

function AuthorInfoSection({
  control,
}: {
  control: Control<BlogDetailPageApiData>
}) {
  return (
    <SectionAccordion title="Author Info" order={6} control={control}>
      <AuthorFields control={control} namePrefix="sections.authorInfo.author" />
    </SectionAccordion>
  )
}

/* ============================================================
   AUTHOR
============================================================ */

function AuthorSection({
  control,
  namePrefix,
  title,
  order,
}: {
  control: Control<BlogDetailPageApiData>
  namePrefix: string
  title: string
  order: number
}) {
  return (
    <SectionAccordion title={title} order={order} control={control}>
      <AuthorFields control={control} namePrefix={namePrefix} />
    </SectionAccordion>
  )
}

function AuthorFields({
  control,
  namePrefix,
}: {
  control: Control<BlogDetailPageApiData>
  namePrefix: string
}) {
  return (
    <div className="space-y-4">
      <LocalizedField
        control={control}
        name={`${namePrefix}.name`}
        label="Name"
      />

      <LocalizedField
        control={control}
        name={`${namePrefix}.designation`}
        label="Designation"
      />

      <LocalizedField
        control={control}
        name={`${namePrefix}.bio`}
        label="Bio"
        multiline
      />

      <BlogImageField
        control={control}
        name={`${namePrefix}.image`}
        label="Author Image"
      />

      <PlainField
        control={control}
        name={`${namePrefix}.linkedinUrl`}
        label="LinkedIn URL"
        placeholder="https://linkedin.com/in/..."
      />
    </div>
  )
}

/* ============================================================
   SEO
============================================================ */

function BlogDetailSeoSection({
  control,
}: {
  control: Control<BlogDetailPageApiData>
}) {
  return (
    <SectionAccordion title="SEO" order={7} control={control} defaultOpen>
      <LocalizedField
        control={control}
        name="seo.metaTitle"
        label="Meta Title"
      />

      <LocalizedField
        control={control}
        name="seo.metaDescription"
        label="Meta Description"
        multiline
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <KeywordField
          control={control}
          name="seo.keywords.en"
          label="Keywords EN"
          placeholder="kitchen trends 2026, kitchen design dubai"
        />

        <KeywordField
          control={control}
          name="seo.keywords.ar"
          label="Keywords AR"
          placeholder="اتجاهات مطبخ 2026"
        />
      </div>

      <PlainField
        control={control}
        name="seo.canonicalUrl"
        label="Canonical URL"
        placeholder="https://t1studio.ae/blog/top-kitchen-trends-2026"
      />

      <BlogImageField control={control} name="seo.ogImage" label="OG Image" />

      <div className="grid grid-cols-2 gap-4">
        <BoolField control={control} name="seo.noIndex" label="No Index" />

        <BoolField control={control} name="seo.noFollow" label="No Follow" />
      </div>
    </SectionAccordion>
  )
}

/* ============================================================
   KEYWORDS
============================================================ */

function KeywordField({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<BlogDetailPageApiData>
  name: string
  label: string
  placeholder: string
}) {
  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <div className="space-y-1.5">
          <Label>{label}</Label>

          <Input
            value={(field.value ?? []).join(", ")}
            onChange={(event) => {
              field.onChange(
                event.target.value
                  .split(",")
                  .map((value) => value.trim())
                  .filter(Boolean)
              )
            }}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  )
}

/* ============================================================
   BLOG IMAGE
============================================================ */

function BlogImageField({
  control,
  name,
  label,
}: {
  control: Control<BlogDetailPageApiData>
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
