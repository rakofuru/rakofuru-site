"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // Correct import for App Router
import { Button } from "@/components/ui/button"
import { ChevronLeft, Save, Trash2 } from "lucide-react"
import { farmsView, getFarmViewBySlug } from "@/lib/view-data"

export default function FarmEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    // Unwrap params using React.use() or await in async component. 
    // Since this is a client component, we use React.use() or just treating it as any for simplicity in this mock.
    // Actually, Next.js 15+ params is a Promise. We need to handle that.
    // Let's assume standard client component behavior or simple state init.
    // For simplicity:
    const [farmId, setFarmId] = useState<string>("")
    const [formData, setFormData] = useState<any>(null)

    useEffect(() => {
        params.then(p => {
            setFarmId(p.id)
            const found = farmsView.find(f => f.id === p.id)
            if (found) {
                setFormData({ ...found })
            }
        })
    }, [params])

    if (!formData) return <div className="p-8">Loading...</div>

    const handleSave = () => {
        alert("保存しました（デモモード：実際のデータは更新されません）")
        router.push("/admin/dashboard")
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ChevronLeft className="h-4 w-4" />
                        戻る
                    </Button>
                    <h1 className="text-2xl font-bold">農園編集: {formData.title}</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        削除
                    </Button>
                    <Button onClick={handleSave} className="font-bold">
                        <Save className="h-4 w-4 mr-2" />
                        保存する
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-bold border-b pb-2">基本情報</h3>
                    <div>
                        <label className="block text-sm font-bold mb-1">農園名</label>
                        <input className="w-full border rounded p-2" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">スラッグ (URL)</label>
                        <input className="w-full border rounded p-2 bg-slate-50" value={formData.slug} disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">エリア</label>
                        <input className="w-full border rounded p-2" value={formData.categorySlug} onChange={e => setFormData({ ...formData, categorySlug: e.target.value })} />
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h3 className="font-bold border-b pb-2">画像管理</h3>
                    <div>
                        <label className="block text-sm font-bold mb-1">メイン画像 (URL)</label>
                        <div className="flex gap-4">
                            {formData.heroImage?.srcUrl && (
                                <img src={formData.heroImage?.srcUrl} className="h-20 w-20 object-cover rounded" />
                            )}
                            <input className="flex-1 border rounded p-2" value={formData.heroImage?.srcUrl || ""} onChange={e => setFormData({ ...formData, heroImage: { ...formData.heroImage, srcUrl: e.target.value } })} />
                        </div>
                    </div>
                </div>

                {/* Config */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4 md:col-span-2">
                    <h3 className="font-bold border-b pb-2">詳細設定</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">料金 (目安テキスト)</label>
                            <input className="w-full border rounded p-2" value={formData.pricingBrief || ""} onChange={e => setFormData({ ...formData, pricingBrief: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">料金 (検索用数値)</label>
                            <input type="number" className="w-full border rounded p-2" value={formData.priceValue || 0} onChange={e => setFormData({ ...formData, priceValue: parseInt(e.target.value) })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">営業時期 (テキスト)</label>
                            <input className="w-full border rounded p-2" value={formData.seasonBrief || ""} onChange={e => setFormData({ ...formData, seasonBrief: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">営業時間 (テキスト)</label>
                            <input className="w-full border rounded p-2" value={formData.hoursBrief || ""} onChange={e => setFormData({ ...formData, hoursBrief: e.target.value })} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-bold mb-2">特徴タグ</label>
                        <div className="flex flex-wrap gap-2">
                            {["駐車場あり", "食べ放題", "要予約", "雨天OK", "持ち帰り可"].map(tag => (
                                <label key={tag} className="flex items-center gap-2 border p-2 rounded cursor-pointer hover:bg-slate-50">
                                    <input
                                        type="checkbox"
                                        checked={formData.features?.includes(tag)}
                                        onChange={e => {
                                            const newFeatures = e.target.checked
                                                ? [...(formData.features || []), tag]
                                                : (formData.features || []).filter((f: string) => f !== tag);
                                            setFormData({ ...formData, features: newFeatures });
                                        }}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-bold mb-2">基本情報 (テーブル)</h4>
                        <div className="grid gap-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500">電話番号</label>
                                <input className="w-full border rounded p-1" value={(formData.infoTable as any)?.["電話番号"] || ""} onChange={e => setFormData({ ...formData, infoTable: { ...formData.infoTable, "電話番号": e.target.value } })} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">所在地</label>
                                <textarea className="w-full border rounded p-1 h-20" value={(formData.infoTable as any)?.["所在地"] || ""} onChange={e => setFormData({ ...formData, infoTable: { ...formData.infoTable, "所在地": e.target.value } })} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <h4 className="font-bold mb-2">外部連携</h4>
                        <div className="space-y-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500">公式サイト URL</label>
                                <input className="w-full border rounded p-1" value={formData.location?.officialUrl || ""} onChange={e => setFormData({ ...formData, location: { ...formData.location, officialUrl: e.target.value } })} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">Google Map URL</label>
                                <input className="w-full border rounded p-1" value={formData.location?.googleMapsPlaceUrl || ""} onChange={e => setFormData({ ...formData, location: { ...formData.location, googleMapsPlaceUrl: e.target.value } })} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500">Google Review Widget ID</label>
                                <input className="w-full border rounded p-1" value={formData.reviewWidgetId || ""} onChange={e => setFormData({ ...formData, reviewWidgetId: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections (HTML Mock Editor) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4 md:col-span-2">
                    <h3 className="font-bold border-b pb-2">セクションコンテンツ</h3>
                    {formData.sections?.map((section: any, idx: number) => (
                        <div key={idx} className="border p-4 rounded bg-slate-50">
                            <input
                                className="font-bold w-full border-b bg-transparent mb-2"
                                value={section.title}
                                onChange={e => {
                                    const newSections = [...formData.sections];
                                    newSections[idx].title = e.target.value;
                                    setFormData({ ...formData, sections: newSections });
                                }}
                            />
                            <textarea
                                className="w-full border rounded p-2 h-32 font-mono text-xs"
                                value={section.contentHtml}
                                onChange={e => {
                                    const newSections = [...formData.sections];
                                    newSections[idx].contentHtml = e.target.value;
                                    setFormData({ ...formData, sections: newSections });
                                }}
                            />
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, sections: [...(formData.sections || []), { title: "新規セクション", contentHtml: "<p>内容...</p>" }] })}>
                        + セクション追加
                    </Button>
                </div>

            </div>
        </div>
    )
}
