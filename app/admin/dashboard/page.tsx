"use client"

import { useState } from "react"
import { farmsView } from "@/lib/view-data"
import { Button } from "@/components/ui/button"
import { Search, Edit, Eye, EyeOff } from "lucide-react"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"farms" | "requests">("farms")
    const [searchTerm, setSearchTerm] = useState("")

    // Mock State for Visibility Toggles
    const [farms, setFarms] = useState(farmsView.map(f => ({ ...f, isPublic: true })))

    // Mock Requests
    const [requests, setRequests] = useState([
        { id: 1, name: "さとやまベリー園", owner: "佐藤 健一", email: "sato@example.com", date: "2024-01-07" },
        { id: 2, name: "房総ブルーベリーヒル", owner: "鈴木 一郎", email: "suzuki@example.com", date: "2024-01-06" }
    ])

    const filteredFarms = farms.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const toggleVisibility = (id: string) => {
        setFarms(farms.map(f => f.id === id ? { ...f, isPublic: !f.isPublic } : f))
    }

    return (
        <div className="container mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">ダッシュボード</h2>
                    <p className="text-muted-foreground">サイト全体の管理・運営状況</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("farms")}
                    className={`pb-2 px-4 font-bold border-b-2 transition-colors ${activeTab === "farms" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                    農園管理
                </button>
                <button
                    onClick={() => setActiveTab("requests")}
                    className={`pb-2 px-4 font-bold border-b-2 transition-colors ${activeTab === "requests" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                    掲載詳細 ({requests.length})
                </button>
            </div>

            {activeTab === "farms" && (
                <>
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="rounded-lg border border-input pl-9 pr-4 py-2 text-sm w-full md:w-64 focus:ring-1 focus:ring-primary"
                            placeholder="農園名で検索..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">ステータス</th>
                                    <th className="px-6 py-4">農園名</th>
                                    <th className="px-6 py-4">エリア</th>
                                    <th className="px-6 py-4">更新日</th>
                                    <th className="px-6 py-4 text-right">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredFarms.map(farm => (
                                    <tr key={farm.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleVisibility(farm.id)}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${farm.isPublic ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                                            >
                                                {farm.isPublic ? (
                                                    <><Eye className="h-3 w-3" /> 公開中</>
                                                ) : (
                                                    <><EyeOff className="h-3 w-3" /> 非公開</>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {farm.title}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {farm.categorySlug}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(farm.updatedAt).toLocaleDateString()}
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
                </>
            )}

            {activeTab === "requests" && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">申請日</th>
                                <th className="px-6 py-4">農園名</th>
                                <th className="px-6 py-4">代表者</th>
                                <th className="px-6 py-4">メールアドレス</th>
                                <th className="px-6 py-4 text-right">アクション</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {requests.map(req => (
                                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-500">{req.date}</td>
                                    <td className="px-6 py-4 font-bold">{req.name}</td>
                                    <td className="px-6 py-4">{req.owner}</td>
                                    <td className="px-6 py-4 text-blue-600">{req.email}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm">詳細確認</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}
