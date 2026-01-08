"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ClipboardList, Home, LogOut, Users } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
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
      <aside className="hidden w-64 flex-col bg-slate-900 text-white md:flex">
        <div className="flex h-16 items-center px-6 text-xl font-bold tracking-wider border-b border-white/10">RAKOFURU</div>
        <nav className="flex-1 space-y-1 p-4">
          <Link href="/admin" className="flex items-center gap-3 rounded-lg bg-primary px-4 py-3 font-medium text-white">
            <Home className="h-5 w-5" />
            農園一覧
          </Link>
          <Link
            href="/admin/requests"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition-colors hover:text-white"
          >
            <ClipboardList className="h-5 w-5" />
            申請管理
          </Link>
          <Link
            href="/partners/join"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition-colors hover:text-white"
          >
            <Users className="h-5 w-5" />
            オーナーフォーム
          </Link>
        </nav>
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 transition-colors hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            ログアウト
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 md:px-10">
          <h1 className="text-sm font-bold text-gray-800 md:text-base">管理ダッシュボード</h1>
          <div className="text-xs text-gray-500 md:text-sm">Login as: rakofuru@gmail.com</div>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-10">{children}</div>
      </main>
    </div>
  )
}
