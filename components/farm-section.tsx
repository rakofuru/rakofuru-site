interface FarmSectionProps {
    title: string;
    contentHtml: string;
}

export function FarmSection({ title, contentHtml }: FarmSectionProps) {
    if (!contentHtml) return null;

    return (
        <section className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-foreground border-l-4 border-primary pl-3">{title}</h2>
            <div
                className="farm-content prose prose-stone max-w-none text-muted-foreground [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:h-auto"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </section>
    )
}
