const DEFAULT_SITE_URL = "https://rakofuru.com"

export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const base = envUrl || DEFAULT_SITE_URL
  return base.endsWith("/") ? base.slice(0, -1) : base
}
