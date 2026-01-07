"use client"

import { useState } from "react"
import { farmsView } from "@/lib/view-data"
import { Button } from "@/components/ui/button"
import { Search, Edit, Eye, EyeOff } from "lucide-react"

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState("")

    // Mock State for Visibility Toggles (In real app, fetch from DB)
    // Initialize from static data
    const [farms, setFarms] = useState(farmsView.map(f => ({ ...f, isPublic: true })))

    const filteredFarms = farms.filter(f => f.title.toLowerCase().includes(searchTerm.toLowerCase()))

    const toggleVisibility = (id: string) => {
        setFarms(farms.map(f => f.id === id ? { ...f, isPublic: !f.isPublic } : f))
    }

    return (
        <div className="container mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">農園一覧</h2>
                    <p className="text-muted-foreground">登録されている農園データの編集・管理ができます</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        className="rounded-lg border border-input pl-9 pr-4 py-2 text-sm w-64 focus:ring-1 focus:ring-primary"
                        placeholder="農園名で検索..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
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
                                    <Button variant="outline" size="sm" className="gap-2" >
                                        <Edit className="h-3 w-3" />
                                        編集
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
