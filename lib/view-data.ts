
import farmsViewData from '../data/farms.view.json';
import areaMasterData from '../data/area-master.json';

// Explicit interface to avoid inference issues
export interface FarmView {
    id: string;
    slug: string;
    categorySlug: string;
    title: string;
    heroImage: {
        id: string;
        srcUrl: string;
        alt: string | null;
        title: string | null;
        width: number;
        height: number;
    } | null;
    location: {
        googleMapsPlaceUrl: string | null;
        googleMapsReviewsUrl: string | null;
        addressText: string | null;
        phone: string | null;
        officialUrl: string | null;
    };
    publishedAt: string;
    updatedAt: string;
    infoTable: Record<string, string>;
    pricingBrief: string;
    parkingBrief: string;
    hoursBrief: string;
    // Phase 5
    priceValue: number;
    hasTakeout: boolean;
    seasonBrief: string;
    sections: {
        title: string;
        contentHtml: string;
    }[];
    reviewWidgetId: string | null;
    googleMapsEmbed: string | null;
    features: string[];
}

export type AreaMaster = typeof areaMasterData;

export const farmsView = (farmsViewData as unknown) as FarmView[];
export const areaMaster = areaMasterData as AreaMaster;

export const locations = Object.entries(areaMaster).map(([slug, data]) => ({
    slug,
    name: data.label,
    order: data.order
})).sort((a, b) => a.order - b.order);

// Helper to get Japanese area name
export function getAreaName(slug: string): string {
    // @ts-ignore
    return areaMaster[slug]?.label || slug;
}

export function getFarmViewBySlug(slug: string): FarmView | undefined {
    return farmsView.find(f => f.slug === slug);
}
