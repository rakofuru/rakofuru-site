"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Search, Edit } from "lucide-react"

type AdminFarm = {
  id: string
  slug: string
  title: string
  categorySlug: string
  isPublic: boolean
  updatedAt: string
}

export default function AdminFarmListPage() {
  const [farms, setFarms] = useState<AdminFarm[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/farms")
        const data = (await response.json()) as { farms: AdminFarm[] }
        setFarms(data.farms || [])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const filteredFarms = useMemo(() => {
    if (!searchTerm.trim()) return farms
    const keyword = searchTerm.toLowerCase()
    return farms.filter((farm) => farm.title.toLowerCase().includes(keyword))
  }, [farms, searchTerm])

  const toggleVisibility = async (id: string, nextValue: boolean) => {
    try {
      const response = await fetch(`/api/admin/farms/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_public: nextValue }),
      })
      if (!response.ok) return
      setFarms((prev) => prev.map((farm) => (farm.id === id ? { ...farm, isPublic: nextValue } : farm)))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">農園一覧</h2>
          <p className="text-muted-foreground">公開設定や編集画面への入口を管理します。</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="w-full rounded-lg border border-input py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary md:w-64"
          placeholder="農園名で検索..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-700">
            <tr>
              <th className="px-6 py-4">公開</th>
              <th className="px-6 py-4">農園名</th>
              <th className="px-6 py-4">エリア</th>
              <th className="px-6 py-4">更新日</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td className="px-6 py-6 text-muted-foreground" colSpan={5}>
                  読み込み中...
                </td>
              </tr>
            )}
            {!isLoading &&
              filteredFarms.map((farm) => (
                <tr key={farm.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleVisibility(farm.id, !farm.isPublic)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
                        farm.isPublic ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 bg-gray-100 text-gray-500"
                      }`}
                    >
                      {farm.isPublic ? (
                        <>
                          <Eye className="h-3 w-3" />
                          公開中
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          非公開
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{farm.title}</td>
                  <td className="px-6 py-4 text-slate-600">{farm.categorySlug}</td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(farm.updatedAt).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={`/admin/farms/${farm.id}`}>
                        <Edit className="h-3 w-3" />
                        編集
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
