interface Comment {
  id: string
  farmSlug: string
  author: string
  date: string
  content: string
  parentId: string | null
}

interface FarmCommentsProps {
  comments: Comment[]
}

export function FarmComments({ comments }: FarmCommentsProps) {
  if (!comments || comments.length === 0) return null

  // Get root comments (no parentId)
  const rootComments = comments.filter((c) => c.parentId === null)

  // Get replies for a comment
  const getReplies = (commentId: string) => comments.filter((c) => c.parentId === commentId)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">みんなの声 ({comments.length}件)</h2>
      <div className="space-y-4">
        {rootComments.map((comment) => {
          const replies = getReplies(comment.id)

          return (
            <div key={comment.id} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/50">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
                </div>
              </div>
              <p className="text-card-foreground">{comment.content}</p>

              {replies.length > 0 && (
                <div className="mt-4 space-y-3 border-l-2 border-primary/20 pl-4">
                  {replies.map((reply) => (
                    <div key={reply.id} className="rounded-lg bg-muted/50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                          {reply.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{reply.author}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(reply.date)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
