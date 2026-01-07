
interface ReviewWidgetProps {
    id: string | null;
}

export function ReviewWidget({ id }: ReviewWidgetProps) {
    if (!id) return null;

    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h3 className="mb-4 font-bold text-lg">Google Map 口コミ</h3>
            <div className="rounded-lg bg-muted/50 p-6 text-center text-muted-foreground">
                {/* 
            In a real scenario, we would load the Google Reviews Widget script here using the ID.
            Since we can't easily reproduce the WP shortcode logic without the plugin, 
            we will show a placeholder or a link.
          */}
                <p className="mb-2">口コミウィジェット (ID: {id})</p>
                <p className="text-sm">※ 実際のサイトではここにGoogleの口コミが表示されます</p>
            </div>
        </div>
    )
}
