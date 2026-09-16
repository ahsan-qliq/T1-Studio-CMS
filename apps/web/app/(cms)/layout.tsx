import { CmsLayout } from "@/components/cms/layout/cms-layout"
import { getAuthTokens, isDevAuthBypassEnabled } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CmsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { accessToken } = await getAuthTokens()
  if (!accessToken && !isDevAuthBypassEnabled()) redirect("/login")

  return <CmsLayout>{children}</CmsLayout>
}
