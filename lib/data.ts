import farmsData from "@/data/farms.json"
import pagesData from "@/data/pages.json"
import tagsData from "@/data/tags.json"
import searchIndexData from "@/data/search-index.json"
import siteData from "@/data/site.json"

type FarmImage = {
  id: string
  srcUrl: string
  alt: string | null
  title: string | null
  width: number
  height: number
}

export type Farm = {
  id: string
  slug: string
  categorySlug: string
  title: string
  excerpt: string | null
  bodyHtml: string
  heroImage: FarmImage | null
  images: FarmImage[]
  location: {
    googleMapsPlaceUrl: string
    googleMapsReviewsUrl: string | null
    addressText: string | null
    phone: string | null
    officialUrl: string | null
  }
  attribution: {
    source: string
    sourceUrl: string | null
  }
  legacy: {
    wpPermalink: string | null
  }
}

export type Page = {
  id: string
  slug: string
  title: string
  bodyHtml: string
  publishedAt: string
  updatedAt: string
  status: string
  legacy: {
    wpPostId: number
    wpPermalink: string
  }
}

export type Tags = {
  areas: string[]
  categories: string[]
  farmAttributes: string[]
  pageSections: string[]
}

export type SearchIndexEntry = {
  type: "farm" | "page"
  id: string
  slug: string
  title: string
  tags: string[]
  text: string
}

export type SiteMeta = {
  name: string
  tagline: string
  description: string
  locale: string
  timezone: string
  canonicalDomain: string
  seo: {
    titleTemplate: string
    defaultTitle: string
    defaultDescription: string
    robots: string
    ogImageUrl: string
  }
}

export const farms = farmsData as Farm[]
export const pages = pagesData as Page[]
export const tags = tagsData as Tags
export const searchIndex = searchIndexData as SearchIndexEntry[]
export const site = siteData as SiteMeta

export const areas = tags.areas.map((slug) => ({ slug, name: slug }))

export const getFarmBySlug = (slug: string) => farms.find((farm) => farm.slug === slug)
export const getPageBySlug = (slug: string) => pages.find((page) => page.slug === slug)
