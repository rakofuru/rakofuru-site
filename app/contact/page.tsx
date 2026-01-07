import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-16 max-w-2xl">
                <h1 className="text-2xl font-bold text-center mb-8">お問い合わせ</h1>

                <div className="bg-white p-6 md:p-8 rounded-xl border border-border shadow-sm">
                    <p className="text-sm text-gray-600 mb-6">
                        当サイト「らこふる」に関するお問い合わせは以下のフォームよりお願いいたします。<br />
                        掲載農園へのお問い合わせは、各農園のページから直接ご連絡ください。
                    </p>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">お名前 <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="山田 太郎" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">メールアドレス <span className="text-red-500">*</span></label>
                            <input type="email" className="w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="rakofuru@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">お問い合わせ内容 <span className="text-red-500">*</span></label>
                            <textarea className="w-full h-32 rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="お問い合わせ内容をご記入ください" required />
                        </div>

                        <Button className="w-full font-bold">送 信</Button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}
