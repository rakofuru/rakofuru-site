"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Save } from "lucide-react"

type FarmForm = {
  id: string
  slug: string
  title: string
  excerpt: string
  categorySlug: string
  bodyHtml: string
  heroImageUrl: string
  thumbnailUrl: string
  addressText: string
  phone: string
  officialUrl: string
  googleMapsPlaceUrl: string
  googleMapsReviewsUrl: string
  parkingText: string
  priceText: string
  hoursText: string
  accessText: string
  isPublic: boolean
}

const emptyForm: FarmForm = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  categorySlug: "",
  bodyHtml: "",
  heroImageUrl: "",
  thumbnailUrl: "",
  addressText: "",
  phone: "",
  officialUrl: "",
  googleMapsPlaceUrl: "",
  googleMapsReviewsUrl: "",
  parkingText: "",
  priceText: "",
  hoursText: "",
  accessText: "",
  isPublic: true,
}

export default function FarmEditPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [formData, setFormData] = useState<FarmForm>(emptyForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`/api/admin/farms/${params.id}`)
        const data = (await response.json()) as { farm: FarmForm }
        if (data.farm) {
          setFormData(data.farm)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [params.id])

  const handleChange = (field: keyof FarmForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === "isPublic" ? (event.target as HTMLInputElement).checked : event.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/farms/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          category_slug: formData.categorySlug,
          body_html: formData.bodyHtml,
          hero_image_url: formData.heroImageUrl,
          thumbnail_url: formData.thumbnailUrl,
          address_text: formData.addressText,
          phone: formData.phone,
          official_url: formData.officialUrl,
          google_maps_place_url: formData.googleMapsPlaceUrl,
          google_maps_reviews_url: formData.googleMapsReviewsUrl,
          parking_text: formData.parkingText,
          price_text: formData.priceText,
          hours_text: formData.hoursText,
          access_text: formData.accessText,
          is_public: formData.isPublic,
        }),
      })
      if (!response.ok) throw new Error("Failed to save")
      router.push("/admin")
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-muted-foreground">Loading...</div>
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
            戻る
          </Button>
          <h1 className="text-2xl font-bold">農園編集: {formData.title}</h1>
        </div>
        <Button onClick={handleSave} className="font-bold" disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          保存する
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="border-b pb-2 font-bold">基本情報</h3>
          <div>
            <label className="mb-1 block text-sm font-bold">農園名</label>
            <input className="w-full rounded border p-2" value={formData.title} onChange={handleChange("title")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">スラッグ (URL)</label>
            <input className="w-full rounded border bg-slate-50 p-2" value={formData.slug} disabled />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">エリア</label>
            <input className="w-full rounded border p-2" value={formData.categorySlug} onChange={handleChange("categorySlug")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">抜粋</label>
            <textarea className="w-full rounded border p-2" value={formData.excerpt} onChange={handleChange("excerpt")} />
          </div>
          <label className="flex items-center gap-2 text-sm font-bold">
            <input type="checkbox" checked={formData.isPublic} onChange={handleChange("isPublic")} />
            公開する
          </label>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="border-b pb-2 font-bold">画像管理</h3>
          <div>
            <label className="mb-1 block text-sm font-bold">ヒーロー画像URL</label>
            <input
              className="w-full rounded border p-2"
              value={formData.heroImageUrl}
              onChange={handleChange("heroImageUrl")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">サムネイルURL</label>
            <input
              className="w-full rounded border p-2"
              value={formData.thumbnailUrl}
              onChange={handleChange("thumbnailUrl")}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="border-b pb-2 font-bold">主要項目</h3>
          <div>
            <label className="mb-1 block text-sm font-bold">住所</label>
            <input className="w-full rounded border p-2" value={formData.addressText} onChange={handleChange("addressText")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">電話番号</label>
            <input className="w-full rounded border p-2" value={formData.phone} onChange={handleChange("phone")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">営業時間</label>
            <textarea className="w-full rounded border p-2" value={formData.hoursText} onChange={handleChange("hoursText")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">料金</label>
            <textarea className="w-full rounded border p-2" value={formData.priceText} onChange={handleChange("priceText")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">駐車場</label>
            <textarea className="w-full rounded border p-2" value={formData.parkingText} onChange={handleChange("parkingText")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">アクセス</label>
            <textarea className="w-full rounded border p-2" value={formData.accessText} onChange={handleChange("accessText")} />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="border-b pb-2 font-bold">外部リンク</h3>
          <div>
            <label className="mb-1 block text-sm font-bold">公式URL</label>
            <input className="w-full rounded border p-2" value={formData.officialUrl} onChange={handleChange("officialUrl")} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">Google Map URL</label>
            <input
              className="w-full rounded border p-2"
              value={formData.googleMapsPlaceUrl}
              onChange={handleChange("googleMapsPlaceUrl")}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold">Google Reviews URL</label>
            <input
              className="w-full rounded border p-2"
              value={formData.googleMapsReviewsUrl}
              onChange={handleChange("googleMapsReviewsUrl")}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h3 className="border-b pb-2 font-bold">本文HTML (bodyHtml)</h3>
          <textarea
            className="min-h-[260px] w-full rounded border p-3 font-mono text-xs"
            value={formData.bodyHtml}
            onChange={handleChange("bodyHtml")}
          />
        </div>
      </div>
    </div>
  )
}
