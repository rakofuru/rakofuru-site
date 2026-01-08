import "server-only"

import { farms, type Farm } from "@/lib/data"
import { farmsView, type FarmView } from "@/lib/view-data"
import { buildFarmViewFromHtml } from "@/lib/farm-html"
import { getStableImageForSlug } from "@/lib/images"
import { getSupabaseServerClient } from "@/lib/supabase"

type FarmAdminRow = {
  id: string
  slug: string | null
  title: string | null
  body_html: string | null
  excerpt: string | null
  category_slug: string | null
  hero_image_url: string | null
  thumbnail_url: string | null
  address_text: string | null
  phone: string | null
  official_url: string | null
  google_maps_place_url: string | null
  google_maps_reviews_url: string | null
  parking_text: string | null
  price_text: string | null
  hours_text: string | null
  access_text: string | null
  is_public: boolean | null
  updated_at: string | null
}

export type FarmViewWithAdmin = FarmView & {
  thumbnailUrl?: string | null
  isPublic: boolean
  adminUpdatedAt?: string | null
}

type AdminMap = Map<string, FarmAdminRow>

const FARM_NAME_KEY = "農園名"
const ADDRESS_KEY = "住所"
const PHONE_KEY = "電話番号"
const PRICE_KEY = "料金"
const HOURS_KEY = "営業時間"
const PARKING_KEY = "駐車場"
const ACCESS_KEY = "アクセス"

function normalizePhone(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, "")
  return cleaned || phone
}

function setInfoValue(
  infoTable: Record<string, string>,
  key: string,
  value: string,
  asLink?: { href: string }
) {
  if (!value) return
  infoTable[key] = asLink
    ? `<a href="${asLink.href}" target="_blank" rel="noreferrer noopener">${value}</a>`
    : value
}

function applyAdminToView(view: FarmView, admin?: FarmAdminRow | null): FarmViewWithAdmin {
  const infoTable = { ...(view.infoTable || {}) }

  if (admin?.title) {
    infoTable[FARM_NAME_KEY] = admin.title
  }
  if (admin?.address_text) {
    infoTable[ADDRESS_KEY] = admin.address_text
  }
  if (admin?.phone) {
    const tel = normalizePhone(admin.phone)
    setInfoValue(infoTable, PHONE_KEY, admin.phone, { href: `tel:${tel}` })
  }
  if (admin?.price_text) {
    infoTable[PRICE_KEY] = admin.price_text
  }
  if (admin?.hours_text) {
    infoTable[HOURS_KEY] = admin.hours_text
  }
  if (admin?.parking_text) {
    infoTable[PARKING_KEY] = admin.parking_text
  }
  if (admin?.access_text) {
    infoTable[ACCESS_KEY] = admin.access_text
  }
  if (admin?.official_url) {
    setInfoValue(infoTable, "公式サイトURL", admin.official_url, {
      href: admin.official_url,
    })
  }

  const next: FarmViewWithAdmin = {
    ...view,
    infoTable,
    title: admin?.title || view.title,
    categorySlug: admin?.category_slug || view.categorySlug,
    location: {
      googleMapsPlaceUrl: admin?.google_maps_place_url || view.location.googleMapsPlaceUrl,
      googleMapsReviewsUrl: admin?.google_maps_reviews_url || view.location.googleMapsReviewsUrl,
      addressText: admin?.address_text || view.location.addressText,
      phone: admin?.phone || view.location.phone,
      officialUrl: admin?.official_url || view.location.officialUrl,
    },
    heroImage: {
      ...(view.heroImage || {
        id: view.id,
        srcUrl: getStableImageForSlug(view.slug),
        alt: null,
        title: null,
        width: 800,
        height: 600,
      }),
      srcUrl: admin?.hero_image_url || view.heroImage?.srcUrl || getStableImageForSlug(view.slug),
    },
    thumbnailUrl: admin?.thumbnail_url || null,
    isPublic: admin?.is_public ?? true,
    adminUpdatedAt: admin?.updated_at || null,
  }

  if (admin?.price_text) {
    const firstLine = admin.price_text.split(/\n|<br\s*\/?>/i)[0]
    next.pricingBrief = firstLine.trim()
    const priceMatch = admin.price_text.match(/(\d{3,5})/)
    if (priceMatch) {
      next.priceValue = Number.parseInt(priceMatch[1], 10)
    }
  }
  if (admin?.parking_text) {
    next.parkingBrief = admin.parking_text.split(/\n|<br\s*\/?>/i)[0].trim()
  }
  if (admin?.hours_text) {
    next.hoursBrief = admin.hours_text.split(/\n|<br\s*\/?>/i)[0].trim()
  }

  return next
}

async function getFarmAdminMap(): Promise<AdminMap> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return new Map()

  const { data, error } = await supabase.from("farms_admin").select("*")
  if (error || !data) {
    return new Map()
  }

  const map = new Map<string, FarmAdminRow>()
  data.forEach((row) => {
    if (row.id) {
      map.set(row.id, row as FarmAdminRow)
    }
    if (row.slug) {
      map.set(row.slug, row as FarmAdminRow)
    }
  })
  return map
}

function getBaseFarmBySlug(slug: string) {
  return farms.find((farm) => farm.slug === slug) || null
}

function getBaseFarmViewBySlug(slug: string) {
  return farmsView.find((farm) => farm.slug === slug) || null
}

export async function getFarmViewList(): Promise<FarmViewWithAdmin[]> {
  const adminMap = await getFarmAdminMap()
  return farmsView
    .map((farm) => applyAdminToView(farm, adminMap.get(farm.id) || adminMap.get(farm.slug)))
    .filter((farm) => farm.isPublic)
}

export async function getFarmViewBySlug(slug: string): Promise<FarmViewWithAdmin | null> {
  const adminMap = await getFarmAdminMap()
  const baseFarm = getBaseFarmBySlug(slug)
  const baseView = getBaseFarmViewBySlug(slug)
  const admin = adminMap.get(slug) || (baseFarm ? adminMap.get(baseFarm.id) : undefined)

  if (!baseFarm && !baseView) return null

  let view = baseView
  if (!view && baseFarm) {
    view = buildFarmViewFromHtml(baseFarm)
  }

  if (admin?.body_html && baseFarm) {
    view = buildFarmViewFromHtml({ ...baseFarm, bodyHtml: admin.body_html })
  }

  if (!view) return null

  const combined = applyAdminToView(view, admin)
  if (!combined.isPublic) {
    return null
  }
  return combined
}

export async function getFarmSitemapEntries() {
  const adminMap = await getFarmAdminMap()
  return farms
    .map((farm) => {
      const admin = adminMap.get(farm.id) || adminMap.get(farm.slug)
      if (admin?.is_public === false) {
        return null
      }
      return {
        slug: farm.slug,
        lastModified: admin?.updated_at || farm.updatedAt || farm.publishedAt,
      }
    })
    .filter((entry): entry is { slug: string; lastModified: string } => Boolean(entry))
}

export async function getAdminFarmList() {
  const adminMap = await getFarmAdminMap()
  return farms.map((farm) => {
    const admin = adminMap.get(farm.id) || adminMap.get(farm.slug)
    return {
      id: farm.id,
      slug: farm.slug,
      title: admin?.title || farm.title,
      categorySlug: admin?.category_slug || farm.categorySlug,
      isPublic: admin?.is_public ?? true,
      updatedAt: admin?.updated_at || farm.updatedAt || farm.publishedAt,
    }
  })
}

export async function getAdminFarmDetail(id: string) {
  const adminMap = await getFarmAdminMap()
  const baseFarm = farms.find((farm) => farm.id === id)
  const admin = adminMap.get(id)

  if (!baseFarm && !admin) return null

  return {
    id: baseFarm?.id || admin?.id || id,
    slug: admin?.slug || baseFarm?.slug || "",
    title: admin?.title || baseFarm?.title || "",
    excerpt: admin?.excerpt || baseFarm?.excerpt || "",
    categorySlug: admin?.category_slug || baseFarm?.categorySlug || "",
    bodyHtml: admin?.body_html || baseFarm?.bodyHtml || "",
    heroImageUrl: admin?.hero_image_url || baseFarm?.heroImage?.srcUrl || "",
    thumbnailUrl: admin?.thumbnail_url || "",
    addressText: admin?.address_text || baseFarm?.location?.addressText || "",
    phone: admin?.phone || baseFarm?.location?.phone || "",
    officialUrl: admin?.official_url || baseFarm?.location?.officialUrl || "",
    googleMapsPlaceUrl: admin?.google_maps_place_url || baseFarm?.location?.googleMapsPlaceUrl || "",
    googleMapsReviewsUrl: admin?.google_maps_reviews_url || baseFarm?.location?.googleMapsReviewsUrl || "",
    parkingText: admin?.parking_text || "",
    priceText: admin?.price_text || "",
    hoursText: admin?.hours_text || "",
    accessText: admin?.access_text || "",
    isPublic: admin?.is_public ?? true,
  }
}

export async function upsertFarmAdmin(id: string, updates: Partial<FarmAdminRow>) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    throw new Error("Supabase client not configured.")
  }

  const baseFarm = farms.find((farm) => farm.id === id)
  if (baseFarm && !updates.slug) {
    updates.slug = baseFarm.slug
  }

  const payload = {
    id,
    ...updates,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("farms_admin").upsert(payload).select("*").single()
  if (error) {
    throw error
  }
  return data as FarmAdminRow
}
