"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BarChart, Users, Settings, LogOut, Home, FileText } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    useEffect(() => {
        // Simple Guard
        const session = localStorage.getItem("rakofuru_admin_session")
        if (!session) {
            router.push("/login_29966")
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("rakofuru_admin_session")
        router.push("/login_29966")
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 font-bold text-xl tracking-wider border-b border-white/10">
                    RAKOFURU
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white font-medium">
                        <Home className="h-5 w-5" />
                        ダッシュボード
                    </Link>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors w-full">
                        <LogOut className="h-5 w-5" />
                        ログアウト
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10">
                    <h1 className="font-bold text-gray-800">管理者ダッシュボード</h1>
                    <div className="text-sm text-gray-500">
                        Login as: rakofuru@gmail.com
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    )
}
