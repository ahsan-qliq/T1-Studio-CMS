import { notFound } from "next/navigation"
import { PageEditor } from "@/components/cms/page-editor/page-editor"
import { homePage } from "@/data/mock"

interface PageEditorPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return [{ slug: "home" }]
}

export default async function PageEditorPage({ params }: PageEditorPageProps) {
  const { slug } = await params

  // For now only the home page is implemented with full data
  if (slug !== "home") {
    notFound()
  }

  return <PageEditor page={homePage} />
}
