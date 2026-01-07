import { FarmView } from "@/lib/view-data"
import { Clock, Car, Wallet, Calendar } from "lucide-react"

interface UnifiedInfoBlockProps {
    farm: FarmView
}

export function UnifiedInfoBlock({ farm }: UnifiedInfoBlockProps) {
    // Helpers to extract display string
    const getInfo = (key: string) => (farm.infoTable as any)?.[key] || "";
    const price = getInfo("料金");
    const hours = getInfo("営業時間");
    const parking = getInfo("駐車場");
    const access = getInfo("アクセス");

    return (
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-border flex items-center gap-2">
                <span className="inline-block h-6 w-1 bg-primary rounded-full"></span>
                <h2 className="text-lg font-bold text-gray-900">農園基本情報</h2>
            </div>

            <div className="grid divide-y divide-gray-100 lg:grid-cols-3 lg:divide-x lg:divide-y-0">

                {/* 1. Price Column */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                        <Wallet className="h-5 w-5" />
                        <h3 className="font-bold">料金プラン</h3>
                    </div>
                    <div className="prose prose-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: price || "詳細はお問い合わせください" }} />
                    {farm.features.includes("食べ放題") && (
                        <span className="mt-3 inline-block rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700">
                            食べ放題あり
                        </span>
                    )}
                </div>

                {/* 2. Season & Hours Column */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                        <Calendar className="h-5 w-5" />
                        <h3 className="font-bold">営業期間・時間</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-xs font-bold text-muted-foreground block mb-1">期間</span>
                            <p className="text-sm font-medium">{farm.seasonBrief || "6月〜8月 (要確認)"}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-muted-foreground block mb-1">時間</span>
                            <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: hours || "詳細はお問い合わせください" }} />
                        </div>
                    </div>
                </div>

                {/* 3. Access & Parking Column */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-primary">
                        <Car className="h-5 w-5" />
                        <h3 className="font-bold">アクセス・駐車場</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <span className="text-xs font-bold text-muted-foreground block mb-1">駐車場</span>
                            <div className="prose prose-sm text-gray-600" dangerouslySetInnerHTML={{ __html: parking || "詳細はお問い合わせください" }} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-muted-foreground block mb-1">アクセス</span>
                            <div className="prose prose-sm text-gray-600 line-clamp-4" dangerouslySetInnerHTML={{ __html: access || "地図をご確認ください" }} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
