import { Shop } from "./shop.model";

export interface Shoptimings {
    id: number;
    shop_id: number;
    shop?: Shop;
    dayId: number;
    isOpen: number;
    openTime: string;
    closeTime: string;
    created_at?: string;
    updated_at?: string;
}
