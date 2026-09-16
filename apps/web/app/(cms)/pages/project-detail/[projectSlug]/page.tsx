import { ProjectDetailFormClient } from "@/components/cms/project-detail-form/project-detail-form-client"
import { fetchProjectDetailPage } from "@/lib/project-detail-page-api"
import { createEmptyProjectDetailPage } from "@/lib/project-detail-page-defaults"

interface ProjectDetailPageProps {
  params: Promise<{ projectSlug: string }>
}

export default async function ProjectDetailEditorPage({
  params,
}: ProjectDetailPageProps) {
  const { projectSlug } = await params

  let data
  if (projectSlug === "new") {
    data = createEmptyProjectDetailPage()
  } else {
    try {
      data = await fetchProjectDetailPage(projectSlug)
    } catch (err) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-lg font-semibold text-zinc-900">
          Couldn&apos;t load this project page
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {err instanceof Error ? err.message : "Unknown error"} — is the API
          running at the configured CMS_API_BASE_URL, and does a record exist
          for slug &quot;{projectSlug}&quot;?
        </p>
      </div>
    )
    }
  }

  return (
    <div className="mx-auto w-full px-6 py-6">
      <ProjectDetailFormClient initialData={data} />
    </div>
  )
}
