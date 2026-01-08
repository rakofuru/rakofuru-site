import type { MetadataRoute } from "next"
import { pages } from "@/lib/data"
import { getSiteUrl } from "@/lib/site"
import { getFarmSitemapEntries } from "@/lib/farms"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const farmEntries = await getFarmSitemapEntries()

  const pageEntries = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt || page.publishedAt,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...pageEntries,
    ...farmEntries.map((farm) => ({
      url: `${baseUrl}/farms/${farm.slug}`,
      lastModified: farm.lastModified,
    })),
  ]
}
