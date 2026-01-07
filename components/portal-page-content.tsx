"use client"

import { useState, useMemo } from "react"
import { farmsView, getAreaName } from "@/lib/view-data"
import { FarmCard } from "./farm-card"
import { SearchFilter, FilterState } from "./search-filter"
import { MapPin } from "lucide-react"

export function PortalPageContent() {
    const [filters, setFilters] = useState<FilterState>({
        keyword: "",
        priceMax: 3000,
        season: "all",
        features: {
            parking: false,
            takeout: false,
            reservation: false,
            tabehoudai: false
        }
    })

    const filteredFarms = useMemo(() => {
        return farmsView.filter((farm) => {
            // 1. Keyword
            if (filters.keyword) {
                const query = filters.keyword.toLowerCase()
                const titleMatch = farm.title.toLowerCase().includes(query)
                const featureMatch = farm.features?.some(f => f.includes(query))
                if (!titleMatch && !featureMatch) return false
            }

            // 2. Price Max (Slider)
            // Use priceValue if available.
            // If priceValue is 0, we treat it as unknown.
            // Logic: Show if priceValue <= filters.priceMax OR priceValue is unknown (0)?
            // Better UX: If filtered low, maybe hide expensive ones.
            if (filters.priceMax < 3000) {
                if (farm.priceValue > filters.priceMax) return false;
            }

            // Tabehoudai (Feature Check)
            if (filters.features.tabehoudai && !farm.features.includes("食べ放題")) return false;


            // 3. Season
            if (filters.season !== "all") {
                let targetMonth = 0;
                if (filters.season === "6月") targetMonth = 6;
                if (filters.season === "7月") targetMonth = 7;
                if (filters.season === "8月") targetMonth = 8;

                // Use the precise range array if available
                if (farm.seasonMonths && farm.seasonMonths.length > 0) {
                    if (!farm.seasonMonths.includes(targetMonth)) return false;
                } else {
                    // Fallback to string match
                    if (!farm.seasonBrief.includes(filters.season)) return false;
                }
            }

            // 4. Features
            if (filters.features.parking && !farm.features.includes("駐車場あり")) return false;
            if (filters.features.takeout && !farm.hasTakeout) return false;
            if (filters.features.reservation && !farm.features.includes("要予約")) return false;

            return true
        })
    }, [filters])
                    </div >
                )
}
            </section >
        </div >
    )
}
