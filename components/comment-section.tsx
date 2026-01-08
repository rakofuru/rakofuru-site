"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, User } from "lucide-react"

export type CommentItem = {
  id: string
  farmSlug: string
  authorName: string
  body: string
  createdAt: string
  parentId: string | null
}

interface CommentSectionProps {
  farmSlug: string
  initialComments: CommentItem[]
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

const formatRelative = (dateStr: string) => {
  const date = new Date(dateStr).getTime()
  const now = Date.now()
  const diff = now - date
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat("ja", { numeric: "auto" })
  if (days > 0) return rtf.format(-days, "day")
  if (hours > 0) return rtf.format(-hours, "hour")
  if (minutes > 0) return rtf.format(-minutes, "minute")
  return "たった今"
}

export function CommentSection({ farmSlug, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>(initialComments)
  const [authorName, setAuthorName] = useState("")
  const [body, setBody] = useState("")
  const [replyFor, setReplyFor] = useState<string | null>(null)
  const [replyName, setReplyName] = useState("")
  const [replyBody, setReplyBody] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const rootComments = useMemo(() => comments.filter((comment) => comment.parentId === null), [comments])
  const replies = useMemo(() => {
    return comments.reduce<Record<string, CommentItem[]>>((acc, comment) => {
      if (comment.parentId) {
        acc[comment.parentId] = [...(acc[comment.parentId] || []), comment]
      }
      return acc
    }, {})
  }, [comments])

  const submitComment = async (payload: { authorName: string; body: string; parentId?: string | null }) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmSlug,
          authorName: payload.authorName,
          body: payload.body,
          parentId: payload.parentId ?? null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit comment.")
      }

      const data = (await response.json()) as { comment: CommentItem }
      setComments((prev) => [...prev, data.comment])
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!authorName.trim() || !body.trim()) return
    await submitComment({ authorName: authorName.trim(), body: body.trim() })
    setAuthorName("")
    setBody("")
  }

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!replyFor || !replyName.trim() || !replyBody.trim()) return
    await submitComment({ authorName: replyName.trim(), body: replyBody.trim(), parentId: replyFor })
    setReplyFor(null)
    setReplyName("")
    setReplyBody("")
  }

  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
        <MessageCircle className="h-5 w-5 text-primary" />
        応援コメント
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 rounded-lg border border-slate-100 bg-slate-50 p-4">
        <div className="grid gap-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">お名前</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                className="w-full rounded-md border border-input bg-white p-2 pl-9 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="例: ブルーベリー好き"
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">コメント</label>
            <textarea
              className="min-h-[100px] w-full resize-none rounded-md border border-input bg-white p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="農園への応援コメントや感想を書こう..."
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button disabled={!authorName.trim() || !body.trim() || isSubmitting} className="gap-2 font-bold">
              <Send className="h-4 w-4" />
              コメントを投稿
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {rootComments.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-muted-foreground">
            まだコメントがありません。最初の応援コメントを投稿しましょう。
          </div>
        )}

        {rootComments.map((comment) => (
          <div key={comment.id} className="rounded-xl border border-border/70 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {comment.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-card-foreground">{comment.authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)} ・ {formatRelative(comment.createdAt)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line">{comment.body}</p>
            <div className="mt-3 flex justify-end">
              <button
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setReplyFor(replyFor === comment.id ? null : comment.id)}
                type="button"
              >
                <MessageCircle className="h-3 w-3" />
                返信
              </button>
            </div>

            {replyFor === comment.id && (
              <form onSubmit={handleReplySubmit} className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="grid gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-700">お名前</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-input bg-white p-2 text-xs focus:border-primary focus:ring-1 focus:ring-primary"
                      value={replyName}
                      onChange={(event) => setReplyName(event.target.value)}
                      placeholder="例: 農園オーナー"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-gray-700">返信コメント</label>
                    <textarea
                      className="min-h-[80px] w-full resize-none rounded-md border border-input bg-white p-2 text-xs focus:border-primary focus:ring-1 focus:ring-primary"
                      value={replyBody}
                      onChange={(event) => setReplyBody(event.target.value)}
                      placeholder="返信内容を入力..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={!replyName.trim() || !replyBody.trim() || isSubmitting}
                      className="gap-2 font-bold"
                    >
                      <Send className="h-3 w-3" />
                      返信を投稿
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {replies[comment.id]?.length ? (
              <div className="mt-4 space-y-3 border-l-2 border-primary/20 pl-4">
                {replies[comment.id].map((reply) => (
                  <div key={reply.id} className="rounded-lg bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                        {reply.authorName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{reply.authorName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(reply.createdAt)} ・ {formatRelative(reply.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-foreground whitespace-pre-line">{reply.body}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
