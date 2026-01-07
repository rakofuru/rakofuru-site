"use client"

import { Search } from "lucide-react"

interface SearchFilterProps {
    onFilterChange: (filters: FilterState) => void;
    filters: FilterState;
}

export interface FilterState {
    keyword: string;
    priceRange: "all" | "under1500" | "over1500" | "tabehoudai";
    season: "all" | "current" | "june" | "july" | "august";
    features: {
        parking: boolean;
        takeout: boolean;
        reservation: boolean;
    };
}

export function SearchFilter({ onFilterChange, filters }: SearchFilterProps) {

    const handleFeatureChange = (key: keyof FilterState['features']) => {
        onFilterChange({
            ...filters,
            features: {
                ...filters.features,
                [key]: !filters.features[key]
            }
        });
    };

    return (
        <div className="mx-auto mt-6 max-w-4xl rounded-xl bg-white p-6 shadow-xl border border-border/50">

            {/* 1. Keyword (Main) */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="キーワード検索（農園名、品種など）"
                    className="w-full rounded-lg border border-input bg-slate-50 py-3 pl-10 pr-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    value={filters.keyword}
                    onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* 2. Price Range */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-700">料金プラン</h3>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                checked={filters.priceRange === "all"}
                                onChange={() => onFilterChange({ ...filters, priceRange: "all" })}
                                className="accent-primary"
                            />
                            <span className="text-sm text-slate-700">指定なし</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                checked={filters.priceRange === "under1500"}
                                onChange={() => onFilterChange({ ...filters, priceRange: "under1500" })}
                                className="accent-primary"
                            />
                            <span className="text-sm text-slate-700">1,500円以下 (大人)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                checked={filters.priceRange === "tabehoudai"}
                                onChange={() => onFilterChange({ ...filters, priceRange: "tabehoudai" })}
                                className="accent-primary"
                            />
                            <span className="text-sm text-slate-700 font-medium text-orange-600">食べ放題あり</span>
                        </label>
                    </div>
                </div>

                {/* 3. Season */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-700">営業時期</h3>
                    <select
                        className="w-full rounded-md border border-input bg-white py-2 px-3 text-sm focus:border-primary focus:outline-none"
                        value={filters.season}
                        onChange={(e) => onFilterChange({ ...filters, season: e.target.value as any })}
                    >
                        <option value="all">指定なし</option>
                        <option value="current">今すぐ行ける (営業中)</option>
                        <option value="june">6月 (早生)</option>
                        <option value="july">7月 (最盛期)</option>
                        <option value="august">8月 (晩生)</option>
                    </select>
                    <p className="text-xs text-muted-foreground">※生育状況により変動します</p>
                </div>

                {/* 4. Features */}
                <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-700">こだわり条件</h3>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.features.parking}
                                onChange={() => handleFeatureChange("parking")}
                                className="rounded border-gray-300 accent-primary"
                            />
                            <span className="text-sm text-slate-700">駐車場あり</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.features.takeout}
                                onChange={() => handleFeatureChange("takeout")}
                                className="rounded border-gray-300 accent-primary"
                            />
                            <span className="text-sm text-slate-700">お持ち帰り可</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.features.reservation}
                                onChange={() => handleFeatureChange("reservation")}
                                className="rounded border-gray-300 accent-primary"
                            />
                            <span className="text-sm text-slate-700">要予約</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
