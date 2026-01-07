import { Info } from "lucide-react"

interface FarmInfoTableProps {
    infoTable: Record<string, string>;
}

export function FarmInfoTable({ infoTable }: FarmInfoTableProps) {
    if (!infoTable || Object.keys(infoTable).length === 0) return null;

    // Define key order if we want specific ordering, otherwise render all
    // Common keys: "料金", "営業時間", "定休日", "アクセス", "駐車場", "備考"
    // We'll render in the order provided by the extraction script (which follows DOM order)

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="bg-primary/5 px-4 py-3 border-b border-border flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground">基本情報</h3>
            </div>
            <dl className="divide-y divide-border">
                {Object.entries(infoTable).map(([key, value]) => {
                    // Skip internal keys if any, or process values
                    return (
                        <div key={key} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4 hover:bg-muted/30 transition-colors">
                            <dt className="font-medium text-foreground sm:col-span-1">{key}</dt>
                            <dd
                                className="text-sm text-muted-foreground sm:col-span-2 [&_a]:text-primary [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: value }}
                            />
                        </div>
                    );
                })}
            </dl>
        </div>
    )
}
