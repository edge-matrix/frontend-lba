import { ShopSocialMedia, Combos, Items, ShopSettings, ShopAddress, ShopPhotos, ShopReviews, Shoptimings, ShopTaxes } from "@models";

export interface Shop {
    id: number;
    title: string;
    slug: string;
    code: string;
    restroType: number;
    profileImage?: string;
    verified: number;
    about: string;
    speciality?: string;
    popularDishes?: string;
    peoplesPoint?: string;
    note?: string;
    address?: Array<ShopAddress>;
    combos: Array<Combos>;
    items: Array<Items>;
    shop_reviews: Array<ShopReviews>;
    photos: Array<ShopPhotos>;
    timings: Array<Shoptimings>;
    social_media?: Array<ShopSocialMedia>;
    settings?: ShopSettings;
    taxes: Array<ShopTaxes>;
    status: number;
    tags: string;
    accommodations: string;
    created_at?: string;
    updated_at?: string;
}
