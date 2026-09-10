import { CmsLayout } from "@/components/cms/layout/cms-layout"

export default function CmsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CmsLayout>{children}</CmsLayout>
}
