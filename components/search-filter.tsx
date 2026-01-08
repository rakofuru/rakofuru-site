"use client"

import { Calendar, Car, CheckCircle2, MapPin, Search, SlidersHorizontal, Utensils } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export type SortKey = "priceAsc" | "priceDesc" | "reviews" | "updated"

export interface FilterState {
  keyword: string
  area: "all" | "chiba"
  priceMax: number
  seasonRange: [number, number]
  sort: SortKey
  features: {
    parking: boolean
    takeout: boolean
    reservation: boolean
    tabehoudai: boolean
    roofShade: boolean
  }
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterState) => void
  filters: FilterState
}

export function SearchFilter({ onFilterChange, filters }: SearchFilterProps) {
  const toggleFeature = (key: keyof FilterState["features"]) => {
    onFilterChange({
      ...filters,
      features: { ...filters.features, [key]: !filters.features[key] },
    })
  }

  return (
    <div className="mx-auto mt-6 max-w-6xl rounded-xl border border-border/50 bg-white p-6 shadow-xl">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="農園名や特徴で検索..."
            className="w-full rounded-lg border border-input bg-slate-50 py-3 pl-10 pr-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={filters.keyword}
            onChange={(event) => onFilterChange({ ...filters, keyword: event.target.value })}
          />
        </div>
        <div className="flex items-center gap-2">
          {[
            { value: "all", label: "すべて" },
            { value: "chiba", label: "千葉" },
          ].map((area) => (
            <button
              key={area.value}
              onClick={() => onFilterChange({ ...filters, area: area.value as FilterState["area"] })}
              className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                filters.area === area.value ? "bg-primary text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              {area.label}
            </button>
          ))}
        </div>
        <Button className="shrink-0 px-6 font-bold shadow-md" type="button">
          検索
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">¥</span>
            料金上限 (大人)
          </label>
          <div className="px-1 pt-4 pb-2">
            <Slider
              value={[filters.priceMax]}
              max={3000}
              step={100}
              min={500}
              onValueChange={(value) => onFilterChange({ ...filters, priceMax: value[0] })}
              className="mb-2"
            />
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>¥500</span>
              <span className="text-sm font-bold text-primary">¥{filters.priceMax}</span>
              <span>¥3000+</span>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 p-2 transition-colors hover:bg-slate-50">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border ${
                filters.features.tabehoudai ? "border-primary bg-primary text-white" : "border-slate-300 bg-white"
              }`}
            >
              {filters.features.tabehoudai && <CheckCircle2 className="h-3.5 w-3.5" />}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={filters.features.tabehoudai}
              onChange={() => toggleFeature("tabehoudai")}
            />
            <span className="text-sm font-medium text-slate-700">食べ放題プランあり</span>
          </label>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <Calendar className="h-4 w-4 text-primary" />
            営業時期 (月レンジ)
          </label>
          <div className="px-1 pt-4 pb-2">
            <Slider
              value={filters.seasonRange}
              min={6}
              max={9}
              step={1}
              onValueChange={(value) =>
                onFilterChange({ ...filters, seasonRange: [value[0], value[1]] as [number, number] })
              }
              className="mb-2"
            />
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>6月</span>
              <span className="text-sm font-bold text-primary">
                {filters.seasonRange[0]}月〜{filters.seasonRange[1]}月
              </span>
              <span>9月</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            こだわり条件
          </label>
          <div className="space-y-2">
            {[
              { key: "parking", label: "駐車場あり", icon: Car },
              { key: "takeout", label: "お持ち帰り可", icon: Utensils },
              { key: "reservation", label: "要予約", icon: SlidersHorizontal },
              { key: "roofShade", label: "屋根・日陰あり", icon: SlidersHorizontal },
            ].map((item) => (
              <label
                key={item.key}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 p-2 transition-colors hover:bg-slate-50"
              >
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded border ${
                    filters.features[item.key as keyof FilterState["features"]]
                      ? "border-primary bg-primary text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {filters.features[item.key as keyof FilterState["features"]] && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={filters.features[item.key as keyof FilterState["features"]]}
                  onChange={() => toggleFeature(item.key as keyof FilterState["features"])}
                />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          並び替え
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "priceAsc", label: "料金が安い順" },
            { value: "priceDesc", label: "料金が高い順" },
            { value: "reviews", label: "口コミ導線優先" },
            { value: "updated", label: "更新日順" },
          ].map((sort) => (
            <button
              key={sort.value}
              onClick={() => onFilterChange({ ...filters, sort: sort.value as SortKey })}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                filters.sort === sort.value ? "bg-primary text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
