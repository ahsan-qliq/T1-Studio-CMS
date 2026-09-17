import { notFound } from "next/navigation"
import { SpacesPageFormClient } from "@/components/cms/spaces-page-form/spaces-page-form-client"
import { ProjectsPageFormClient } from "@/components/cms/projects-page-form/projects-page-form-client"
import { fetchSpacesPage } from "@/lib/spaces-page-api"
import { fetchProjectsPage } from "@/lib/projects-page-api"
import {
  createEmptyProjectsPage,
  createEmptySpacesPage,
} from "@/lib/legacy-page-defaults"

interface PageEditorPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [{ slug: "spaces" }, { slug: "projects" }]
}

/** Shared error panel so a down/misconfigured API doesn't crash the route. */
function LoadError({ err }: { err: unknown }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-lg font-semibold text-zinc-900">
        Couldn&apos;t load this page
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        {err instanceof Error ? err.message : "Unknown error"} — is the API
        running at the configured CMS_API_BASE_URL?
      </p>
    </div>
  )
}

export default async function PageEditorPage({ params }: PageEditorPageProps) {
  const { slug } = await params

  if (slug === "spaces") {
    let data
    try {
      data = await fetchSpacesPage()
    } catch {
      data = createEmptySpacesPage()
    }
    return (
      <div className="mx-auto w-full px-6 py-6">
        <SpacesPageFormClient initialData={data} />
      </div>
    )
  }

  if (slug === "projects") {
    let data
    try {
      data = await fetchProjectsPage()
    } catch {
      data = createEmptyProjectsPage()
    }
    return (
      <div className="mx-auto w-full px-6 py-6">
        <ProjectsPageFormClient initialData={data} />
      </div>
    )
  }

  notFound()
}
