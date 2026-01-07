"use client"

import { Search, Calendar, Car, Utensils, Clock, CheckCircle2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export interface FilterState {
    keyword: string;
    priceMax: number; // Slider value
    season: "all" | "6月" | "7月" | "8月";
    features: {
        parking: boolean;
        takeout: boolean;
        reservation: boolean;
        tabehoudai: boolean; // Added tabehoudai as feature check
    };
}

interface SearchFilterProps {
    onFilterChange: (filters: FilterState) => void;
    filters: FilterState;
}

export function SearchFilter({ onFilterChange, filters }: SearchFilterProps) {

    const handlePriceChange = (value: number[]) => {
        onFilterChange({ ...filters, priceMax: value[0] });
    };

    const toggleFeature = (key: keyof FilterState['features']) => {
        onFilterChange({
            ...filters,
            features: { ...filters.features, [key]: !filters.features[key] }
        });
    };

    return (
        <div className="mx-auto mt-6 max-w-4xl rounded-xl bg-white p-6 shadow-xl border border-border/50">

            {/* 1. Keyword Search */}
            <div className="relative mb-8 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="農園名や特徴で検索..."
                        className="w-full rounded-lg border border-input bg-slate-50 py-3 pl-10 pr-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        value={filters.keyword}
                        onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
                    />
                </div>
                <Button className="shrink-0 px-6 font-bold bg-primary hover:bg-primary/90 text-white shadow-md">
                    検索
                </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                {/* 2. Price Filter (Slider) */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">¥</span>
                        料金上限 (大人)
                    </label>
                    <div className="px-1 pt-4 pb-2">
                        <Slider
                            defaultValue={[filters.priceMax]}
                            max={3000}
                            step={100}
                            min={500}
                            onValueChange={handlePriceChange}
                            className="mb-2"
                        />
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>¥500</span>
                            <span className="text-primary font-bold text-sm">¥{filters.priceMax}</span>
                            <span>¥3000+</span>
                        </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-100 p-2 hover:bg-slate-50 transition-colors">
                        <div className={`flex h-5 w-5 items-center justify-center rounded border ${filters.features.tabehoudai ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>
                            {filters.features.tabehoudai && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={filters.features.tabehoudai}
                            onChange={() => toggleFeature('tabehoudai')}
                        />
                        <span className="text-sm font-medium text-slate-700">食べ放題プランあり</span>
                    </label>
                </div>

                {/* 3. Season Filter (Simple Months) */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <Calendar className="h-4 w-4 text-primary" />
                        営業時期 (目安)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {(["all", "6月", "7月", "8月"] as const).map((season) => (
                            <button
                                key={season}
                                onClick={() => onFilterChange({ ...filters, season })}
                                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${filters.season === season
                                        ? 'bg-primary text-white shadow-md ring-2 ring-primary ring-offset-1'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {season === "all" ? "指定なし" : season}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. Features Filter (Checkboxes) */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        こだわり条件
                    </label>
                    <div className="space-y-2">
                        {[
                            { key: "parking", label: "駐車場あり", icon: Car },
                            { key: "takeout", label: "お持ち帰り可", icon: Utensils },
                            { key: "reservation", label: "予約必須", icon: Clock },
                        ].map((item) => (
                            <label key={item.key} className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-100 p-2 hover:bg-slate-50 transition-colors">
                                <div className={`flex h-5 w-5 items-center justify-center rounded border ${filters.features[item.key as keyof FilterState['features']] ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'}`}>
                                    {filters.features[item.key as keyof FilterState['features']] && <CheckCircle2 className="h-3.5 w-3.5" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={filters.features[item.key as keyof FilterState['features']]}
                                    onChange={() => toggleFeature(item.key as keyof FilterState['features'])}
                                />
                                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
