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

    // Simple Mock Captcha
    const MOCK_CAPTCHA = "ABCD"

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (captcha !== MOCK_CAPTCHA) {
            setError("画像認証が間違っています")
            return
        }

        if (email === "rakofuru@gmail.com" && password === "iqLmOj)Z!)zYk*jZ") {
            // Success
            // In a real app, set cookie/session here.
            // For this demo, let's just push to dashboard.
            // We'll trust client-side for this MVP step.
            // Save state to localStorage for persistence as requested ("fingerprint/IP like persistence")
            // Just mocking persistence with localStorage for now.
            localStorage.setItem("rakofuru_admin_session", "valid");
            router.push("/admin/dashboard")
        } else {
            setError("メールアドレスまたはパスワードが違います")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl border border-slate-200">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">農園管理ログイン</h1>
                    <p className="mt-2 text-sm text-gray-600">管理者専用ページへアクセスします</p>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                        {error}
                    </div>
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">画像認証 (CAPTCHA)</label>
                        <div className="flex gap-4 items-center">
                            <div className="flex h-10 w-24 items-center justify-center rounded bg-slate-200 font-mono text-xl font-bold tracking-widest text-slate-600 select-none">
                                {MOCK_CAPTCHA}
                            </div>
                            <input
                                type="text"
                                required
                                className="flex-1 rounded-lg border border-input py-2 px-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="画像を文字で入力"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full font-bold py-6 text-lg">
                        ログイン
                    </Button>
                </form>

                <div className="text-center text-xs text-gray-400 mt-4">
                    Secure Login System v1.0
                </div>
            </div>
        </div>
    )
}
