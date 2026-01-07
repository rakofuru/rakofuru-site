"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, User } from "lucide-react"

export function CommentSection() {
    // Mock Data
    const [comments, setComments] = useState<{ id: number, author: string, text: string, date: string, reply?: string }[]>([
        { id: 1, author: "ブルーベリー大好き", text: "とても甘くて美味しかったです！また行きたいです。", date: "2023/07/15", reply: "ご来園ありがとうございます！ぜひまたお越しください。" },
        { id: 2, author: "家族連れ", text: "駐車場が広くて助かりました。", date: "2023/07/20" }
    ])
    const [input, setInput] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        const newComment = {
            id: Date.now(),
            author: "ゲストユーザー", // Mock
            text: input,
            date: new Date().toLocaleDateString()
        }
        setComments([newComment, ...comments])
        setInput("")
    }

    return (
        <div className="rounded-xl border border-border bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                応援コメント
            </h2>

            {/* Input */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="flex-1 space-y-3">
                        <textarea
                            className="w-full rounded-lg border border-input p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px] resize-none"
                            placeholder="農園への応援コメントや感想を書こう..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button disabled={!input.trim()} className="gap-2 font-bold">
                                <Send className="h-4 w-4" />
                                コメントを投稿
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

            {/* List */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.id} className="group">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                                {comment.author[0]}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="font-bold text-sm text-gray-900">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed bg-slate-50 p-3 rounded-lg rounded-tl-none">
                                    {comment.text}
                                </p>

                                {/* Reply */}
                                {comment.reply && (
                                    <div className="mt-3 ml-4 pl-4 border-l-2 border-primary/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">農園主</span>
                                            <span className="text-xs text-muted-foreground">返信</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {comment.reply}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
