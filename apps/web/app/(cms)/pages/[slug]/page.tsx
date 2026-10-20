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
