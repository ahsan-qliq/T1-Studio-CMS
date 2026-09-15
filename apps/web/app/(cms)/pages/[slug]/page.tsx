import { notFound } from "next/navigation"
import { HomePageFormClient } from "@/components/cms/home-page-form/home-page-form-client"
import { SpacesPageFormClient } from "@/components/cms/spaces-page-form/spaces-page-form-client"
import { ProjectsPageFormClient } from "@/components/cms/projects-page-form/projects-page-form-client"
import { fetchRawHomePage } from "@/lib/home-page-api"
import { fetchSpacesPage } from "@/lib/spaces-page-api"
import { fetchProjectsPage } from "@/lib/projects-page-api"

interface PageEditorPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [{ slug: "home" }, { slug: "spaces" }, { slug: "projects" }]
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

  if (slug === "home") {
    try {
      const data = await fetchRawHomePage()
      return (
        <div className="mx-auto w-full px-6 py-6">
          <HomePageFormClient initialData={data} />
        </div>
      )
    } catch (err) {
      return <LoadError err={err} />
    }
  }

  if (slug === "spaces") {
    try {
      const data = await fetchSpacesPage()
      return (
        <div className="mx-auto w-full px-6 py-6">
          <SpacesPageFormClient initialData={data} />
        </div>
      )
    } catch (err) {
      return <LoadError err={err} />
    }
  }

  if (slug === "projects") {
    try {
      const data = await fetchProjectsPage()
      return (
        <div className="mx-auto w-full px-6 py-6">
          <ProjectsPageFormClient initialData={data} />
        </div>
      )
    } catch (err) {
      return <LoadError err={err} />
    }
  }

  notFound()
}
