"use client"

import { useEffect, useState } from "react"
import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form"

import { Button } from "@workspace/ui/components/button"

import type { Localized } from "@/types/api-home-page"
import type {
  BlogContentBlock,
  BlogDetailPageApiData,
} from "@/types/api-blog-detail-page"

interface BlogDetailFormProps {
  initialData: BlogDetailPageApiData
  onSave: (data: BlogDetailPageApiData) => Promise<void> | void
}

const emptyLocalized = (): Localized => ({
  en: "",
  ar: "",
})

const emptyImage = () => ({
  src: "",
  alt: emptyLocalized(),
})

const emptyBlock = (type: BlogContentBlock["type"]): BlogContentBlock => {
  switch (type) {
    case "heading":
      return {
        type: "heading",
        level: 2,
        heading: emptyLocalized(),
      }

    case "paragraph":
      return {
        type: "paragraph",
        content: emptyLocalized(),
      }

    case "image":
      return {
        type: "image",
        image: emptyImage(),
        caption: emptyLocalized(),
      }

    case "list":
      return {
        type: "list",
        listStyle: "bullet",
        listItems: [],
      }

    case "quote":
      return {
        type: "quote",
        content: emptyLocalized(),
      }
  }
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-900">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-900">{label}</label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
      />
    </div>
  )
}

function LocalizedInput({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: Localized
  onChange: (value: Localized) => void
  multiline?: boolean
}) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-zinc-900">{label}</label>

      <div className="grid gap-3 md:grid-cols-2">
        {multiline ? (
          <>
            <Textarea
              label="English"
              value={value?.en ?? ""}
              onChange={(en) => onChange({ ...value, en })}
            />

            <Textarea
              label="Arabic"
              value={value?.ar ?? ""}
              onChange={(ar) => onChange({ ...value, ar })}
            />
          </>
        ) : (
          <>
            <Input
              label="English"
              value={value?.en ?? ""}
              onChange={(en) => onChange({ ...value, en })}
            />

            <Input
              label="Arabic"
              value={value?.ar ?? ""}
              onChange={(ar) => onChange({ ...value, ar })}
            />
          </>
        )}
      </div>
    </div>
  )
}

function ImageEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: {
    src: string
    alt: Localized
  }
  onChange: (value: { src: string; alt: Localized }) => void
}) {
  return (
    <div className="space-y-4 rounded-md border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-sm font-semibold text-zinc-900">{label}</div>

      <Input
        label="Image URL"
        value={value?.src ?? ""}
        onChange={(src) => onChange({ ...value, src })}
        placeholder="https://cdn.example.com/image.jpg"
      />

      <LocalizedInput
        label="Alt Text"
        value={value?.alt ?? emptyLocalized()}
        onChange={(alt) => onChange({ ...value, alt })}
      />
    </div>
  )
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details
      open={defaultOpen}
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white"
    >
      <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-zinc-900 select-none hover:bg-zinc-50">
        {title}
      </summary>

      <div className="border-t border-zinc-200 p-5">{children}</div>
    </details>
  )
}

function LocalizedController({
  control,
  name,
  label,
  multiline = false,
}: {
  control: Control<BlogDetailPageApiData>
  name: any
  label: string
  multiline?: boolean
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizedInput
          label={label}
          value={field.value ?? emptyLocalized()}
          onChange={field.onChange}
          multiline={multiline}
        />
      )}
    />
  )
}

function ImageController({
  control,
  name,
  label,
}: {
  control: Control<BlogDetailPageApiData>
  name: any
  label: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ImageEditor
          label={label}
          value={field.value ?? emptyImage()}
          onChange={field.onChange}
        />
      )}
    />
  )
}

function BlockEditor({
  index,
  control,
  remove,
  update,
}: {
  index: number
  control: Control<BlogDetailPageApiData>
  remove: (index: number) => void
  update: (index: number, value: BlogContentBlock) => void
}) {
  const [blockType, setBlockType] =
    useState<BlogContentBlock["type"]>("paragraph")

  const {
    fields: listItems,
    append,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `sections.articleContent.blocks.${index}.listItems` as any,
  })

  useEffect(() => {
    const subscription = control._subjects.state.subscribe({
      next: ({ values }: any) => {
        const block = values?.sections?.articleContent?.blocks?.[index]

        if (block?.type) {
          setBlockType(block.type)
        }
      },
    })

    return () => subscription.unsubscribe()
  }, [control, index])

  const changeType = (type: BlogContentBlock["type"]) => {
    setBlockType(type)
    update(index, emptyBlock(type))
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="font-medium text-zinc-900">
          Content Block {index + 1}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={blockType}
            onChange={(e) =>
              changeType(e.target.value as BlogContentBlock["type"])
            }
            className="h-9 rounded-md border border-zinc-200 bg-white px-2 text-sm"
          >
            <option value="heading">Heading</option>
            <option value="paragraph">Paragraph</option>
            <option value="image">Image</option>
            <option value="list">List</option>
            <option value="quote">Quote</option>
          </select>

          <Button
            type="button"
            variant="outline"
            onClick={() => remove(index)}
            className="text-red-600"
          >
            Remove
          </Button>
        </div>
      </div>

      {blockType === "heading" && (
        <div className="space-y-4">
          <Controller
            control={control}
            name={`sections.articleContent.blocks.${index}.level` as any}
            render={({ field }) => (
              <Input
                label="Heading Level"
                type="number"
                value={String(field.value ?? 2)}
                onChange={(value) => field.onChange(Number(value))}
              />
            )}
          />

          <LocalizedController
            control={control}
            name={`sections.articleContent.blocks.${index}.heading`}
            label="Heading"
          />
        </div>
      )}

      {blockType === "paragraph" && (
        <LocalizedController
          control={control}
          name={`sections.articleContent.blocks.${index}.content`}
          label="Paragraph"
          multiline
        />
      )}

      {blockType === "image" && (
        <div className="space-y-4">
          <ImageController
            control={control}
            name={`sections.articleContent.blocks.${index}.image`}
            label="Content Image"
          />

          <LocalizedController
            control={control}
            name={`sections.articleContent.blocks.${index}.caption`}
            label="Caption"
          />
        </div>
      )}

      {blockType === "quote" && (
        <LocalizedController
          control={control}
          name={`sections.articleContent.blocks.${index}.content`}
          label="Quote"
          multiline
        />
      )}

      {blockType === "list" && (
        <div className="space-y-4">
          <Controller
            control={control}
            name={`sections.articleContent.blocks.${index}.listStyle` as any}
            render={({ field }) => (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-900">
                  List Style
                </label>

                <select
                  {...field}
                  className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
                >
                  <option value="bullet">Bullet</option>
                  <option value="number">Number</option>
                </select>
              </div>
            )}
          />

          <div className="space-y-3">
            <div className="text-sm font-medium text-zinc-900">List Items</div>

            {listItems.map((item, itemIndex) => (
              <div
                key={item.id}
                className="rounded-md border border-zinc-200 bg-white p-3"
              >
                <LocalizedController
                  control={control}
                  name={
                    `sections.articleContent.blocks.${index}.listItems.${itemIndex}` as any
                  }
                  label={`Item ${itemIndex + 1}`}
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeItem(itemIndex)}
                  className="mt-3 text-red-600"
                >
                  Remove Item
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append(emptyLocalized() as any)}
            >
              + Add List Item
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function BlogDetailForm({ initialData, onSave }: BlogDetailFormProps) {
  const form = useForm<BlogDetailPageApiData>({
    defaultValues: initialData,
  })

  const { control, register, handleSubmit, formState, reset, watch } = form

  const {
    fields: blocks,
    append: appendBlock,
    remove: removeBlock,
    update: updateBlock,
  } = useFieldArray({
    control,
    name: "sections.articleContent.blocks",
  })

  const {
    fields: consultationFields,
    append: appendConsultationField,
    remove: removeConsultationField,
  } = useFieldArray({
    control,
    name: "sections.consultation.formFields",
  })

  const {
    fields: relatedArticles,
    append: appendRelatedArticle,
    remove: removeRelatedArticle,
  } = useFieldArray({
    control,
    name: "sections.relatedArticles.items",
  })

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    try {
      setSaving(true)

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

  const addBlock = (type: BlogContentBlock["type"]) => {
    appendBlock(emptyBlock(type))
  }

  return (
    <form onSubmit={submit} className="space-y-5 pb-24">
      {/* BASIC INFORMATION */}
      <Section title="Basic Information">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Slug"
              value={watch("slug") || ""}
              onChange={(value) =>
                form.setValue("slug", value, {
                  shouldDirty: true,
                })
              }
              placeholder="top-kitchen-trends-2026"
            />

            <Input
              label="Category"
              value={watch("category") || ""}
              onChange={(value) =>
                form.setValue("category", value, {
                  shouldDirty: true,
                })
              }
              placeholder="design"
            />
          </div>

          <LocalizedController control={control} name="title" label="Title" />

          <LocalizedController
            control={control}
            name="excerpt"
            label="Excerpt"
            multiline
          />

          <LocalizedController
            control={control}
            name="categoryLabel"
            label="Category Label"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <LocalizedController
              control={control}
              name="readTime"
              label="Read Time"
            />

            <Input
              label="Published At"
              value={watch("publishedAt") || ""}
              onChange={(value) =>
                form.setValue("publishedAt", value, {
                  shouldDirty: true,
                })
              }
              placeholder="2026-09-16T00:00:00Z"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-900">
                    Status
                  </label>

                  <select
                    {...field}
                    className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              )}
            />

            <Controller
              control={control}
              name="isFeatured"
              render={({ field }) => (
                <label className="flex items-center gap-2 pt-7 text-sm font-medium text-zinc-900">
                  <input
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  Featured Article
                </label>
              )}
            />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-zinc-900">Tags</div>

            <div className="grid gap-3 md:grid-cols-2">
              <Controller
                control={control}
                name="tags.en"
                render={({ field }) => (
                  <Input
                    label="English Tags"
                    value={(field.value || []).join(", ")}
                    onChange={(value) =>
                      field.onChange(
                        value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="kitchen, trends, 2026"
                  />
                )}
              />

              <Controller
                control={control}
                name="tags.ar"
                render={({ field }) => (
                  <Input
                    label="Arabic Tags"
                    value={(field.value || []).join(", ")}
                    onChange={(value) =>
                      field.onChange(
                        value
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="مطبخ, اتجاهات"
                  />
                )}
              />
            </div>
          </div>

          <ImageController
            control={control}
            name="featuredImage"
            label="Featured Image"
          />
        </div>
      </Section>

      {/* AUTHOR */}
      <Section title="Author">
        <div className="space-y-6">
          <LocalizedController
            control={control}
            name="author.name"
            label="Author Name"
          />

          <LocalizedController
            control={control}
            name="author.designation"
            label="Designation"
          />

          <LocalizedController
            control={control}
            name="author.bio"
            label="Bio"
            multiline
          />

          <ImageController
            control={control}
            name="author.image"
            label="Author Image"
          />

          <Input
            label="LinkedIn URL"
            value={watch("author.linkedinUrl") || ""}
            onChange={(value) =>
              form.setValue("author.linkedinUrl", value, { shouldDirty: true })
            }
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </Section>

      {/* HERO */}
      <Section title="Article Hero">
        <div className="space-y-6">
          <LocalizedController
            control={control}
            name="sections.hero.eyebrow"
            label="Eyebrow"
          />

          <LocalizedController
            control={control}
            name="sections.hero.title"
            label="Title"
          />

          <LocalizedController
            control={control}
            name="sections.hero.excerpt"
            label="Excerpt"
            multiline
          />

          <ImageController
            control={control}
            name="sections.hero.backgroundImage"
            label="Background Image"
          />

          <Controller
            control={control}
            name="sections.hero.overlayOpacity"
            render={({ field }) => (
              <Input
                label="Overlay Opacity"
                type="number"
                value={String(field.value ?? 0.4)}
                onChange={(value) => field.onChange(Number(value))}
              />
            )}
          />
        </div>
      </Section>

      {/* ARTICLE CONTENT */}
      <Section title="Article Content">
        <div className="space-y-6">
          <LocalizedController
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
        </div>
      </Section>

      {/* CONSULTATION */}
      <Section title="Consultation">
        <div className="space-y-6">
          <LocalizedController
            control={control}
            name="sections.consultation.eyebrow"
            label="Eyebrow"
          />

          <LocalizedController
            control={control}
            name="sections.consultation.heading"
            label="Heading"
          />

          <LocalizedController
            control={control}
            name="sections.consultation.description"
            label="Description"
            multiline
          />

          <ImageController
            control={control}
            name="sections.consultation.image"
            label="Consultation Image"
          />

          <LocalizedController
            control={control}
            name="sections.consultation.submitButtonLabel"
            label="Submit Button Label"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">
                Form Fields
              </h3>

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendConsultationField({
                    name: "",
                    type: "text",
                    label: emptyLocalized(),
                    required: false,
                  })
                }
              >
                + Add Field
              </Button>
            </div>

            {consultationFields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-4 rounded-md border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Field {index + 1}</div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeConsultationField(index)}
                    className="text-red-600"
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Name"
                    value={
                      watch(`sections.consultation.formFields.${index}.name`) ||
                      ""
                    }
                    onChange={(value) =>
                      form.setValue(
                        `sections.consultation.formFields.${index}.name`,
                        value,
                        { shouldDirty: true }
                      )
                    }
                  />

                  <Controller
                    control={control}
                    name={
                      `sections.consultation.formFields.${index}.type` as any
                    }
                    render={({ field }) => (
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Type</label>

                        <select
                          {...field}
                          className="h-9 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="tel">Phone</option>
                          <option value="email">Email</option>
                          <option value="textarea">Textarea</option>
                        </select>
                      </div>
                    )}
                  />
                </div>

                <LocalizedController
                  control={control}
                  name={
                    `sections.consultation.formFields.${index}.label` as any
                  }
                  label="Label"
                />

                <Controller
                  control={control}
                  name={
                    `sections.consultation.formFields.${index}.required` as any
                  }
                  render={({ field }) => (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(field.value)}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      Required
                    </label>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* RELATED ARTICLES */}
      <Section title="Related Articles">
        <div className="space-y-5">
          <Button
            type="button"
            variant="outline"
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
          >
            + Add Related Article
          </Button>

          {relatedArticles.map((article, index) => (
            <div
              key={article.id}
              className="space-y-5 rounded-md border border-zinc-200 bg-zinc-50 p-4"
            >
              <div className="flex justify-between">
                <h3 className="text-sm font-semibold">
                  Related Article {index + 1}
                </h3>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeRelatedArticle(index)}
                  className="text-red-600"
                >
                  Remove
                </Button>
              </div>

              <Input
                label="Blog Slug"
                value={
                  watch(`sections.relatedArticles.items.${index}.blogSlug`) ||
                  ""
                }
                onChange={(value) =>
                  form.setValue(
                    `sections.relatedArticles.items.${index}.blogSlug`,
                    value,
                    { shouldDirty: true }
                  )
                }
              />

              <LocalizedController
                control={control}
                name={`sections.relatedArticles.items.${index}.title` as any}
                label="Title"
              />

              <LocalizedController
                control={control}
                name={`sections.relatedArticles.items.${index}.category` as any}
                label="Category"
              />

              <LocalizedController
                control={control}
                name={`sections.relatedArticles.items.${index}.readTime` as any}
                label="Read Time"
              />

              <Input
                label="Href"
                value={
                  watch(`sections.relatedArticles.items.${index}.href`) || ""
                }
                onChange={(value) =>
                  form.setValue(
                    `sections.relatedArticles.items.${index}.href`,
                    value,
                    { shouldDirty: true }
                  )
                }
                placeholder="/blog/example"
              />

              <ImageController
                control={control}
                name={`sections.relatedArticles.items.${index}.image` as any}
                label="Article Image"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* AUTHOR INFO */}
      <Section title="Author Info">
        <div className="space-y-6">
          <LocalizedController
            control={control}
            name="sections.authorInfo.author.name"
            label="Author Name"
          />

          <LocalizedController
            control={control}
            name="sections.authorInfo.author.designation"
            label="Designation"
          />

          <LocalizedController
            control={control}
            name="sections.authorInfo.author.bio"
            label="Bio"
            multiline
          />

          <ImageController
            control={control}
            name="sections.authorInfo.author.image"
            label="Author Image"
          />

          <Input
            label="LinkedIn URL"
            value={watch("sections.authorInfo.author.linkedinUrl") || ""}
            onChange={(value) =>
              form.setValue("sections.authorInfo.author.linkedinUrl", value, {
                shouldDirty: true,
              })
            }
          />
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO">
        <div className="space-y-6">
          <LocalizedController
            control={control}
            name="seo.metaTitle"
            label="Meta Title"
          />

          <LocalizedController
            control={control}
            name="seo.metaDescription"
            label="Meta Description"
            multiline
          />

          <div className="grid gap-3 md:grid-cols-2">
            <Controller
              control={control}
              name="seo.keywords.en"
              render={({ field }) => (
                <Input
                  label="English Keywords"
                  value={(field.value || []).join(", ")}
                  onChange={(value) =>
                    field.onChange(
                      value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="kitchen trends 2026, kitchen design dubai"
                />
              )}
            />

            <Controller
              control={control}
              name="seo.keywords.ar"
              render={({ field }) => (
                <Input
                  label="Arabic Keywords"
                  value={(field.value || []).join(", ")}
                  onChange={(value) =>
                    field.onChange(
                      value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="اتجاهات مطبخ 2026"
                />
              )}
            />
          </div>

          <Input
            label="Canonical URL"
            value={watch("seo.canonicalUrl") || ""}
            onChange={(value) =>
              form.setValue("seo.canonicalUrl", value, { shouldDirty: true })
            }
            placeholder="https://t1studio.ae/blog/example"
          />

          <ImageController
            control={control}
            name="seo.ogImage"
            label="OG Image"
          />

          <div className="flex gap-6">
            <Controller
              control={control}
              name="seo.noIndex"
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  No Index
                </label>
              )}
            />

            <Controller
              control={control}
              name="seo.noFollow"
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  No Follow
                </label>
              )}
            />
          </div>
        </div>
      </Section>

      {/* SAVE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-5 py-2 text-sm font-medium text-white"
        >
          {saving ? "Saving..." : formState.isDirty ? "Save Blog" : "Saved"}
        </Button>
      </div>
    </form>
  )
}
