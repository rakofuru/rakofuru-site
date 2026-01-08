"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock, Mail } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captcha, setCaptcha] = useState("")
  const [error, setError] = useState("")

  const MOCK_CAPTCHA = "ABCD"

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    setError("")

    if (captcha !== MOCK_CAPTCHA) {
      setError("画像認証コードが一致しません。")
      return
    }

    if (email === "rakofuru@gmail.com" && password === "iqLmOj)Z!)zYk*jZ") {
      localStorage.setItem("rakofuru_admin_session", "valid")
      router.push("/admin")
    } else {
      setError("メールアドレスまたはパスワードが違います。")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">管理者ログイン</h1>
          <p className="mt-2 text-sm text-gray-600">管理ダッシュボードへアクセスします。</p>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">メールアドレス</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                className="w-full rounded-lg border border-input py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="admin@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">パスワード</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                className="w-full rounded-lg border border-input py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">画像認証 (CAPTCHA)</label>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-24 select-none items-center justify-center rounded bg-slate-200 font-mono text-xl font-bold tracking-widest text-slate-600">
                {MOCK_CAPTCHA}
              </div>
              <input
                type="text"
                required
                className="flex-1 rounded-lg border border-input px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="認証コードを入力"
                value={captcha}
                onChange={(event) => setCaptcha(event.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-6 text-lg font-bold">
            ログイン
          </Button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">Secure Login System v1.0</div>
      </div>
    </div>
  )
}
