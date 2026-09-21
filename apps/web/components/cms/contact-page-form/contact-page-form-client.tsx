"use client"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"

import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
} from "react-hook-form"

import { useState } from "react"

import {
  LocalizedField,
  PlainField,
  BoolField,
  ImageField,
  SectionAccordion,
  DeleteItemButton,
  AddItemButton,
} from "../home-page-form/shared-fields"

import { SeoFields } from "../form-shared/seo-field"

import type { ContactPageApiData } from "@/types/api-contact-page"

/* =========================================================
   HELPERS
========================================================= */

const l = () => ({
  en: "",
  ar: "",
})

/* =========================================================
   MAIN FORM
========================================================= */

export function ContactPageFormClient({
  initialData,
}: {
  initialData: ContactPageApiData
}) {
  const form = useForm<ContactPageApiData>({
    defaultValues: initialData,
  })

  const { control, handleSubmit, formState, reset } = form

  const [saving, setSaving] = useState(false)

  const submit = handleSubmit(async (data) => {
    setSaving(true)

    try {
      const response = await fetch("/api/save-contact-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }
      // Re-fetch the freshly saved page so the form reflects exactly what
      // the backend now has (e.g. CDN URLs the backend fills in from the
      // uploaded image's S3 key).
      try {
        const fresh = await fetch("/api/save-contact-page")
        if (fresh.ok) {
          reset((await fresh.json()) as ContactPageApiData)
        }
      } catch (error) {
        console.error("Failed to refresh contact page after save:", error)
      }
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submit} className="w-full space-y-4 pb-24">
      {/* =====================================================
          PAGE INFORMATION
      ===================================================== */}

      <div className="grid w-full grid-cols-1 gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-3">
        <PlainField control={control} name="pageName" label="Page Name" />

        <PlainField control={control} name="slug" label="Slug" />

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
          CONTACT INFORMATION
      ===================================================== */}

      <ContactInfoSection control={control} />

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <ContactFormSection control={control} />

      {/* =====================================================
          LOCATION
      ===================================================== */}

      <LocationSection control={control} />

      {/* =====================================================
          FAQ
      ===================================================== */}

      <FaqSection control={control} />

      {/* =====================================================
          SEO
      ===================================================== */}

      <SeoFields control={control} namePrefix="seo" />

      {/* =====================================================
          SAVE BUTTON
      ===================================================== */}

      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-end border-t border-zinc-200 bg-white px-6 py-3">
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

/* =========================================================
   HERO
========================================================= */

function HeroSection({ control }: { control: Control<ContactPageApiData> }) {
  return (
    <SectionAccordion
      title="Hero"
      order={1}
      control={control}
      visibleName="sections.hero.isVisible"
      defaultOpen
    >
      <div className="w-full space-y-4">
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

        <ImageField
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
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   CONTACT INFORMATION
========================================================= */

function ContactInfoSection({
  control,
}: {
  control: Control<ContactPageApiData>
}) {
  const items = useFieldArray({
    control,
    name: "sections.contactInfo.items",
  })

  return (
    <SectionAccordion
      title="Contact Information"
      order={2}
      control={control}
      visibleName="sections.contactInfo.isVisible"
      defaultOpen
    >
      <div className="flex w-full flex-col gap-5">
        {/* HEADER */}

        <RepeaterHeader
          title="Contact Information Items"
          description="Add phone, email, WhatsApp, address and working hours."
          onAdd={() =>
            items.append({
              type: "",
              icon: "",
              title: l(),
              value: l(),
              href: "",
              openInNewTab: false,
            })
          }
        />

        {/* ITEMS */}

        <div className="w-full space-y-4">
          {items.fields.map((item, index) => (
            <div
              key={item.id}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
            >
              <ItemHeader
                title={`Contact Item ${index + 1}`}
                onDelete={() => items.remove(index)}
              />

              <div className="mt-5 space-y-4">
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                  <PlainField
                    control={control}
                    name={`sections.contactInfo.items.${index}.type`}
                    label="Type"
                    placeholder="phone"
                  />

                  <PlainField
                    control={control}
                    name={`sections.contactInfo.items.${index}.icon`}
                    label="Icon"
                    placeholder="phone"
                  />
                </div>

                <LocalizedField
                  control={control}
                  name={`sections.contactInfo.items.${index}.title`}
                  label="Title"
                />

                <LocalizedField
                  control={control}
                  name={`sections.contactInfo.items.${index}.value`}
                  label="Value"
                  multiline
                />

                <PlainField
                  control={control}
                  name={`sections.contactInfo.items.${index}.href`}
                  label="Href"
                  placeholder="tel:+971..."
                />

                <BoolField
                  control={control}
                  name={`sections.contactInfo.items.${index}.openInNewTab`}
                  label="Open In New Tab"
                />

                <LocalizedField
                  control={control}
                  name={`sections.contactInfo.items.${index}.secondaryValue`}
                  label="Secondary Value"
                  multiline
                />
              </div>
            </div>
          ))}
        </div>

        {items.fields.length === 0 && (
          <EmptyMessage text="No contact information items added yet." />
        )}
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   CONTACT FORM
========================================================= */

function ContactFormSection({
  control,
}: {
  control: Control<ContactPageApiData>
}) {
  const tabs = useFieldArray({
    control,
    name: "sections.contactForm.tabs",
  })

  const fields = useFieldArray({
    control,
    name: "sections.contactForm.formFields",
  })

  return (
    <SectionAccordion
      title="Contact Form"
      order={3}
      control={control}
      visibleName="sections.contactForm.isVisible"
      defaultOpen
    >
      <div className="w-full space-y-5">
        {/* BASIC CONTENT */}

        <LocalizedField
          control={control}
          name="sections.contactForm.eyebrow"
          label="Eyebrow"
        />

        <LocalizedField
          control={control}
          name="sections.contactForm.heading"
          label="Heading"
          multiline
        />

        <LocalizedField
          control={control}
          name="sections.contactForm.description"
          label="Description"
          multiline
        />

        <ImageField
          control={control}
          name="sections.contactForm.image"
          label="Form Image"
        />

        {/* =================================================
            TABS
        ================================================= */}

        <div className="w-full space-y-4 border-t border-zinc-200 pt-5">
          <RepeaterHeader
            title="Form Tabs"
            description="Add the different enquiry types shown above the contact form."
            onAdd={() =>
              tabs.append({
                label: l(),
                description: l(),
                value: "",
              })
            }
          />

          <div className="w-full space-y-4">
            {tabs.fields.map((item, index) => (
              <div
                key={item.id}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
              >
                <ItemHeader
                  title={`Tab ${index + 1}`}
                  onDelete={() => tabs.remove(index)}
                />

                <div className="mt-5 space-y-4">
                  <LocalizedField
                    control={control}
                    name={`sections.contactForm.tabs.${index}.label`}
                    label="Label"
                  />

                  <LocalizedField
                    control={control}
                    name={`sections.contactForm.tabs.${index}.description`}
                    label="Description"
                    multiline
                  />

                  <PlainField
                    control={control}
                    name={`sections.contactForm.tabs.${index}.value`}
                    label="Value"
                    placeholder="new-project"
                  />
                </div>
              </div>
            ))}
          </div>

          {tabs.fields.length === 0 && (
            <EmptyMessage text="No form tabs added yet." />
          )}
        </div>

        {/* =================================================
            FORM FIELDS
        ================================================= */}

        <div className="w-full space-y-4 border-t border-zinc-200 pt-5">
          <RepeaterHeader
            title="Form Fields"
            description="Configure the fields that visitors can fill in."
            onAdd={() =>
              fields.append({
                name: "",
                type: "text",
                label: l(),
                placeholder: l(),
                required: false,
              })
            }
          />

          <div className="w-full space-y-4">
            {fields.fields.map((item, index) => (
              <div
                key={item.id}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
              >
                <ItemHeader
                  title={`Form Field ${index + 1}`}
                  onDelete={() => fields.remove(index)}
                />

                <div className="mt-5 space-y-4">
                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    <PlainField
                      control={control}
                      name={`sections.contactForm.formFields.${index}.name`}
                      label="Name"
                      placeholder="name"
                    />

                    <Controller
                      control={control}
                      name={`sections.contactForm.formFields.${index}.type`}
                      render={({ field }) => (
                        <div className="space-y-1.5">
                          <Label>Type</Label>

                          <select
                            {...field}
                            className="h-9 w-full rounded-md border border-zinc-200 bg-white px-2 text-sm text-zinc-900"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="tel">Telephone</option>
                            <option value="textarea">Textarea</option>
                            <option value="number">Number</option>
                            <option value="select">Select</option>
                          </select>
                        </div>
                      )}
                    />
                  </div>

                  <LocalizedField
                    control={control}
                    name={`sections.contactForm.formFields.${index}.label`}
                    label="Label"
                  />

                  <LocalizedField
                    control={control}
                    name={`sections.contactForm.formFields.${index}.placeholder`}
                    label="Placeholder"
                  />

                  <BoolField
                    control={control}
                    name={`sections.contactForm.formFields.${index}.required`}
                    label="Required"
                  />
                </div>
              </div>
            ))}
          </div>

          {fields.fields.length === 0 && (
            <EmptyMessage text="No form fields added yet." />
          )}
        </div>

        {/* =================================================
            BUTTON / MESSAGES
        ================================================= */}

        <div className="w-full space-y-4 border-t border-zinc-200 pt-5">
          <LocalizedField
            control={control}
            name="sections.contactForm.submitButtonLabel"
            label="Submit Button Label"
          />

          <LocalizedField
            control={control}
            name="sections.contactForm.successMessage"
            label="Success Message"
            multiline
          />

          <LocalizedField
            control={control}
            name="sections.contactForm.errorMessage"
            label="Error Message"
            multiline
          />
        </div>
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   LOCATION
========================================================= */

function LocationSection({
  control,
}: {
  control: Control<ContactPageApiData>
}) {
  const locations = useFieldArray({
    control,
    name: "sections.location.mapLocations",
  })

  return (
    <SectionAccordion
      title="Location / Map"
      order={4}
      control={control}
      visibleName="sections.location.isVisible"
      defaultOpen
    >
      <div className="w-full space-y-5">
        {/* LOCATIONS */}

        <div className="w-full space-y-4">
          <RepeaterHeader
            title="Map Locations"
            description="Add your showroom, office or other physical locations."
            onAdd={() =>
              locations.append({
                name: l(),
                address: l(),
                latitude: 0,
                longitude: 0,
                googleMapsUrl: "",
                phone: "",
              })
            }
          />

          <div className="w-full space-y-4">
            {locations.fields.map((item, index) => (
              <div
                key={item.id}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
              >
                <ItemHeader
                  title={`Location ${index + 1}`}
                  onDelete={() => locations.remove(index)}
                />

                <div className="mt-5 space-y-4">
                  <LocalizedField
                    control={control}
                    name={`sections.location.mapLocations.${index}.name`}
                    label="Name"
                  />

                  <LocalizedField
                    control={control}
                    name={`sections.location.mapLocations.${index}.address`}
                    label="Address"
                    multiline
                  />

                  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    <PlainField
                      control={control}
                      name={`sections.location.mapLocations.${index}.latitude`}
                      label="Latitude"
                      type="number"
                    />

                    <PlainField
                      control={control}
                      name={`sections.location.mapLocations.${index}.longitude`}
                      label="Longitude"
                      type="number"
                    />
                  </div>

                  <PlainField
                    control={control}
                    name={`sections.location.mapLocations.${index}.googleMapsUrl`}
                    label="Google Maps URL"
                  />

                  <PlainField
                    control={control}
                    name={`sections.location.mapLocations.${index}.phone`}
                    label="Phone"
                  />
                </div>
              </div>
            ))}
          </div>

          {locations.fields.length === 0 && (
            <EmptyMessage text="No map locations added yet." />
          )}
        </div>

        {/* MAP SETTINGS */}

        <div className="w-full space-y-4 border-t border-zinc-200 pt-5">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <PlainField
              control={control}
              name="sections.location.mapEmbedUrl"
              label="Map Embed URL"
            />
            <PlainField
              control={control}
              name="sections.location.mapZoom"
              label="Minimum Zoom"
              type="number"
            />
          </div>
        </div>
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   FAQ
========================================================= */

function FaqSection({ control }: { control: Control<ContactPageApiData> }) {
  const items = useFieldArray({
    control,
    name: "sections.faq.items",
  })

  return (
    <SectionAccordion
      title="FAQ"
      order={5}
      control={control}
      visibleName="sections.faq.isVisible"
      defaultOpen
    >
      <div className="w-full space-y-4">
        <RepeaterHeader
          title="Frequently Asked Questions"
          description="Add questions and answers for the Contact page."
          onAdd={() =>
            items.append({
              question: l(),
              answer: l(),
              isVisible: true,
            })
          }
        />

        <div className="w-full space-y-4">
          {items.fields.map((item, index) => (
            <div
              key={item.id}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-5"
            >
              <ItemHeader
                title={`FAQ ${index + 1}`}
                onDelete={() => items.remove(index)}
              />

              <div className="mt-5 space-y-4">
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
            </div>
          ))}
        </div>

        {items.fields.length === 0 && (
          <EmptyMessage text="No FAQs added yet." />
        )}
      </div>
    </SectionAccordion>
  )
}

/* =========================================================
   REPEATER HEADER
========================================================= */

function RepeaterHeader({
  title,
  description,
  onAdd,
}: {
  title: string
  description?: string
  onAdd: () => void
}) {
  return (
    <div className="flex w-full min-w-0 items-start justify-between gap-6 border-b border-zinc-200 pb-4">
      <div className="min-w-0 flex-1">
        <h3 className="text-base leading-6 font-semibold text-zinc-900">
          {title}
        </h3>

        {description && (
          <p className="mt-1 max-w-none text-sm leading-5 text-zinc-500">
            {description}
          </p>
        )}
      </div>

      <div className="shrink-0">
        <AddItemButton label="Add" onClick={onAdd} />
      </div>
    </div>
  )
}

/* =========================================================
   ITEM HEADER
========================================================= */

function ItemHeader({
  title,
  onDelete,
}: {
  title: string
  onDelete: () => void
}) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <h4 className="text-sm font-semibold text-zinc-900">{title}</h4>

      <div className="shrink-0">
        <DeleteItemButton onClick={onDelete} />
      </div>
    </div>
  )
}

/* =========================================================
   EMPTY MESSAGE
========================================================= */

function EmptyMessage({ text }: { text: string }) {
  return (
    <div className="w-full rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
      {text}
    </div>
  )
}
