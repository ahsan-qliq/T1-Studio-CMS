"use client"

import { useEffect, useState } from "react"
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  type Control,
} from "react-hook-form"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

import {
  LocalizedField,
  PlainField,
  BoolField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
} from "../home-page-form/shared-fields"
import { SeoFields } from "../form-shared/seo-field"

import type { Localized } from "@/types/api-home-page"
import type {
  BlogContentBlock,
  BlogDetailPageApiData,
} from "@/types/api-blog-detail-page"

type F = Control<BlogDetailPageApiData>

const FIELD_TYPES = ["text", "tel", "email", "textarea"]

interface BlogDetailFormProps {
  initialData: BlogDetailPageApiData
  onSave: (data: BlogDetailPageApiData) => Promise<void> | void
}

const emptyLocalized = (): Localized => ({ en: "", ar: "" })

const emptyImage = () => ({ src: "", alt: emptyLocalized() })

const emptyBlock = (type: BlogContentBlock["type"]): BlogContentBlock => {
  switch (type) {
    case "heading":
      return { type: "heading", level: 2, heading: emptyLocalized() }
    case "paragraph":
      return { type: "paragraph", content: emptyLocalized() }
    case "image":
      return { type: "image", image: emptyImage(), caption: emptyLocalized() }
    case "list":
      return { type: "list", listStyle: "bullet", listItems: [] }
    case "quote":
      return { type: "quote", content: emptyLocalized() }
  }
}

/**
 * Image sub-object field for the blog-detail data shape (`{ src, alt }`).
 * Mirrors BlogImageField in blog-page-form — the sibling form that shares
 * the same `src`-based image type — rather than the `home-page-form`
 * ImageField, which is built around the `{ url, key, alt }` shape.
 */
function BlogDetailImageField({
  control,
  name,
  label,
}: {
  control: F
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

/** Comma-separated tag editor for a plain string[] field like tags.en */
function TagsField({
  control,
  name,
  label,
  placeholder,
}: {
  control: F
  name: "tags.en" | "tags.ar"
  label: string
  placeholder?: string
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
            placeholder={placeholder}
          />
        )}
      />
    </div>
  )
}

function BlockEditor({
  index,
  control,
  remove,
  update,
}: {
  index: number
  control: F
  remove: (index: number) => void
  update: (index: number, value: BlogContentBlock) => void
}) {
  const blockType = useWatch({
    control,
    name: `sections.articleContent.blocks.${index}.type` as any,
  }) as BlogContentBlock["type"]

  const {
    fields: listItems,
    append,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `sections.articleContent.blocks.${index}.listItems` as any,
  })

  const changeType = (type: BlogContentBlock["type"]) => {
    update(index, emptyBlock(type))
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
        <span className="text-sm font-semibold text-zinc-900">
          Content Block {index + 1}
        </span>
        <div className="flex items-center gap-2">
          <select
            value={blockType}
            onChange={(e) =>
              changeType(e.target.value as BlogContentBlock["type"])
            }
            className="h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"
          >
            <option value="heading">Heading</option>
            <option value="paragraph">Paragraph</option>
            <option value="image">Image</option>
            <option value="list">List</option>
            <option value="quote">Quote</option>
          </select>
          <DeleteItemButton
            onClick={() => remove(index)}
            label="Remove block"
          />
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        {blockType === "heading" && (
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
        )}

        {blockType === "paragraph" && (
          <LocalizedField
            control={control}
            name={`sections.articleContent.blocks.${index}.content`}
            label="Paragraph"
            multiline
          />
        )}

        {blockType === "image" && (
          <>
            <BlogDetailImageField
              control={control}
              name={`sections.articleContent.blocks.${index}.image`}
              label="Content Image"
            />
            <LocalizedField
              control={control}
              name={`sections.articleContent.blocks.${index}.caption`}
              label="Caption"
            />
          </>
        )}

        {blockType === "quote" && (
          <LocalizedField
            control={control}
            name={`sections.articleContent.blocks.${index}.content`}
            label="Quote"
            multiline
          />
        )}

        {blockType === "list" && (
          <>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">List Style</Label>
              <Controller
                control={control}
                name={
                  `sections.articleContent.blocks.${index}.listStyle` as any
                }
                render={({ field }) => (
                  <select
                    {...field}
                    className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                  >
                    <option value="bullet">Bullet</option>
                    <option value="number">Number</option>
                  </select>
                )}
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium text-zinc-600">List Items</p>
              <div className="space-y-3">
                {listItems.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
                  >
                    <div className="flex-1">
                      <LocalizedField
                        control={control}
                        name={`sections.articleContent.blocks.${index}.listItems.${itemIndex}`}
                        label={`Item ${itemIndex + 1}`}
                      />
                    </div>
                    <DeleteItemButton onClick={() => removeItem(itemIndex)} />
                  </div>
                ))}
              </div>
              <AddItemButton
                label="Add List Item"
                onClick={() => append(emptyLocalized() as any)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function BlogDetailForm({ initialData, onSave }: BlogDetailFormProps) {
  const form = useForm<BlogDetailPageApiData>({ defaultValues: initialData })
  const { control, handleSubmit, formState, reset } = form

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  const {
    fields: blocks,
    append: appendBlock,
    remove: removeBlock,
    update: updateBlock,
  } = useFieldArray({ control, name: "sections.articleContent.blocks" })

  const {
    fields: consultationFields,
    append: appendConsultationField,
    remove: removeConsultationField,
  } = useFieldArray({ control, name: "sections.consultation.formFields" })

  const {
    fields: relatedArticles,
    append: appendRelatedArticle,
    remove: removeRelatedArticle,
  } = useFieldArray({ control, name: "sections.relatedArticles.items" })

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)
    try {
      await onSave({
        ...data,
        slug: data.slug.trim(),
        tags: {
          en: data.tags.en || [],
          ar: data.tags.ar || [],
        },
        seo: {
          ...data.seo,
          keywords: {
            en: data.seo.keywords.en || [],
            ar: data.seo.keywords.ar || [],
          },
        },
      })
    } finally {
      setSaving(false)
    }
  })

  const addBlock = (type: BlogContentBlock["type"]) =>
    appendBlock(emptyBlock(type))

  return (
    <form onSubmit={submit} className="space-y-4 pb-24">
      <SectionAccordion
        title="Basic Information"
        order={1}
        control={control}
        defaultOpen
      >
        <div className="grid grid-cols-2 gap-3">
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

        <div className="grid grid-cols-2 gap-3">
          <LocalizedField control={control} name="readTime" label="Read Time" />
          <PlainField
            control={control}
            name="publishedAt"
            label="Published At"
            placeholder="2026-09-16T00:00:00Z"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Status</Label>
                <select
                  {...field}
                  className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            )}
          />
          <div className="flex items-end pb-1.5">
            <BoolField
              control={control}
              name="isFeatured"
              label="Featured Article"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TagsField
            control={control}
            name="tags.en"
            label="English Tags"
            placeholder="kitchen, trends, 2026"
          />
          <TagsField
            control={control}
            name="tags.ar"
            label="Arabic Tags"
            placeholder="مطبخ, اتجاهات"
          />
        </div>

        <BlogDetailImageField
          control={control}
          name="featuredImage"
          label="Featured Image"
        />
      </SectionAccordion>

      <SectionAccordion title="Author" order={2} control={control}>
        <LocalizedField
          control={control}
          name="author.name"
          label="Author Name"
        />
        <LocalizedField
          control={control}
          name="author.designation"
          label="Designation"
        />
        <LocalizedField
          control={control}
          name="author.bio"
          label="Bio"
          multiline
        />
        <BlogDetailImageField
          control={control}
          name="author.image"
          label="Author Image"
        />
        <PlainField
          control={control}
          name="author.linkedinUrl"
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/..."
        />
      </SectionAccordion>

      <SectionAccordion title="Article Hero" order={3} control={control}>
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
        <BlogDetailImageField
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

      <SectionAccordion title="Article Content" order={4} control={control}>
        <LocalizedField
          control={control}
          name="sections.articleContent.intro"
          label="Introduction"
          multiline
        />

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => addBlock("heading")}
          >
            + Heading
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => addBlock("paragraph")}
          >
            + Paragraph
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => addBlock("image")}
          >
            + Image
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => addBlock("list")}
          >
            + List
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => addBlock("quote")}
          >
            + Quote
          </Button>
        </div>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <BlockEditor
              key={block.id}
              index={index}
              control={control}
              remove={removeBlock}
              update={updateBlock}
            />
          ))}
        </div>
      </SectionAccordion>

      <SectionAccordion title="Consultation" order={5} control={control}>
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
        <BlogDetailImageField
          control={control}
          name="sections.consultation.image"
          label="Consultation Image"
        />
        <LocalizedField
          control={control}
          name="sections.consultation.submitButtonLabel"
          label="Submit Button Label"
        />

        <p className="pt-2 text-xs font-medium text-zinc-600">Form Fields</p>
        <div className="space-y-3">
          {consultationFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
            >
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <PlainField
                    control={control}
                    name={`sections.consultation.formFields.${index}.name`}
                    label="Field Name (key)"
                    placeholder="propertyType"
                  />
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Type</Label>
                    <Controller
                      control={control}
                      name={
                        `sections.consultation.formFields.${index}.type` as any
                      }
                      render={({ field }) => (
                        <select
                          {...field}
                          className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                        >
                          {FIELD_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                </div>
                <LocalizedField
                  control={control}
                  name={`sections.consultation.formFields.${index}.label`}
                  label="Label"
                />
                <BoolField
                  control={control}
                  name={`sections.consultation.formFields.${index}.required`}
                  label="Required"
                />
              </div>
              <DeleteItemButton
                onClick={() => removeConsultationField(index)}
              />
            </div>
          ))}
        </div>
        <AddItemButton
          label="Add Field"
          onClick={() =>
            appendConsultationField({
              name: "",
              type: "text",
              label: emptyLocalized(),
              required: false,
            })
          }
        />
      </SectionAccordion>

      <SectionAccordion title="Related Articles" order={6} control={control}>
        <div className="space-y-3">
          {relatedArticles.map((article, index) => (
            <div
              key={article.id}
              className="flex items-start gap-2 rounded-lg border border-zinc-200 p-3"
            >
              <div className="flex-1 space-y-2">
                <PlainField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.blogSlug`}
                  label="Blog Slug"
                />
                <LocalizedField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.title`}
                  label="Title"
                />
                <div className="grid grid-cols-2 gap-3">
                  <LocalizedField
                    control={control}
                    name={`sections.relatedArticles.items.${index}.category`}
                    label="Category"
                  />
                  <LocalizedField
                    control={control}
                    name={`sections.relatedArticles.items.${index}.readTime`}
                    label="Read Time"
                  />
                </div>
                <PlainField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.href`}
                  label="Link URL"
                  placeholder="/blog/example"
                />
                <BlogDetailImageField
                  control={control}
                  name={`sections.relatedArticles.items.${index}.image`}
                  label="Article Image"
                />
              </div>
              <DeleteItemButton onClick={() => removeRelatedArticle(index)} />
            </div>
          ))}
        </div>
        <AddItemButton
          label="Add Related Article"
          onClick={() =>
            appendRelatedArticle({
              blogSlug: "",
              title: emptyLocalized(),
              category: emptyLocalized(),
              readTime: emptyLocalized(),
              image: emptyImage(),
              href: "",
            })
          }
        />
      </SectionAccordion>

      <SectionAccordion title="Author Info" order={7} control={control}>
        <LocalizedField
          control={control}
          name="sections.authorInfo.author.name"
          label="Author Name"
        />
        <LocalizedField
          control={control}
          name="sections.authorInfo.author.designation"
          label="Designation"
        />
        <LocalizedField
          control={control}
          name="sections.authorInfo.author.bio"
          label="Bio"
          multiline
        />
        <BlogDetailImageField
          control={control}
          name="sections.authorInfo.author.image"
          label="Author Image"
        />
        <PlainField
          control={control}
          name="sections.authorInfo.author.linkedinUrl"
          label="LinkedIn URL"
        />
      </SectionAccordion>

      <SeoFields
        control={control}
        namePrefix="seo"
        renderOgImage={({ control, name, label }) => (
          <BlogDetailImageField control={control} name={name} label={label} />
        )}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : formState.isDirty ? "Save Blog" : "Saved"}
        </Button>
      </div>
    </form>
  )
}
