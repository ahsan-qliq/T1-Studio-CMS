import { BlogDetailFormClient } from "@/components/cms/blog-detail-form/blog-detail-form-client"
import { fetchBlogDetailPage } from "@/lib/blog-detail-page-api"
import { createEmptyBlogDetailPage } from "@/lib/blog-detail-page-defaults"

interface Props { params: Promise<{ blogSlug: string }> }
export default async function BlogDetailPage({ params }: Props) {
  const { blogSlug } = await params
  let data
  if (blogSlug === "new") data = createEmptyBlogDetailPage()
  else {
    try { data = await fetchBlogDetailPage(blogSlug) }
    catch (error) {
      return <div className="mx-auto max-w-2xl px-6 py-16 text-center"><h1 className="text-lg font-semibold text-zinc-900">Couldn&apos;t load this blog page</h1><p className="mt-2 text-sm text-zinc-500">{error instanceof Error ? error.message : "Unknown error"}</p></div>
    }
  }
  return <div className="mx-auto w-full px-6 py-6"><BlogDetailFormClient initialData={data} /></div>
}
