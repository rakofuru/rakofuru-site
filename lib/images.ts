const BLUEBERRY_PLACEHOLDERS = Array.from({ length: 36 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0")
  return `/images/blueberry/blueberry-${id}.svg`
})

export function getStableImageForSlug(slug: string, fallback = "/images/default-farm.png") {
  if (!slug) return fallback
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const list = BLUEBERRY_PLACEHOLDERS
  return list.length > 0 ? list[hash % list.length] : fallback
}

export function getBlueberryPlaceholders() {
  return BLUEBERRY_PLACEHOLDERS
}
