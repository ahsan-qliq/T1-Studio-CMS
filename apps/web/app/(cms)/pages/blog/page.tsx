import { BlogPageFormClient } from "@/components/cms/blog-page-form/blog-page-form-client"
import { fetchBlogPage } from "@/lib/blog-page-api"
import { createEmptyBlogPage } from "@/lib/blog-page-defaults"

export default async function BlogPage() {
  let data
  try { data = await fetchBlogPage() } catch { data = createEmptyBlogPage() }
  return <div className="mx-auto w-full px-6 py-6"><BlogPageFormClient initialData={data} /></div>
}
