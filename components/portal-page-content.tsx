import { getFarmViewList } from "@/lib/farms"
import { PortalPageContentClient } from "@/components/portal-page-content-client"

export async function PortalPageContent() {
  const farms = await getFarmViewList()
  return <PortalPageContentClient initialFarms={farms} />
}
