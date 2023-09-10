import { Shop } from "./shop.model";

export interface ShopSocialMedia {
    id: number;
    shop_id: number;
    shop?: Shop;
    label: string;
    isPhone: number;
    value : string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
