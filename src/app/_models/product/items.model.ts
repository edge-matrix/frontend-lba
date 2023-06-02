import { ItemCategories, Shop } from "@models";

export interface Items {
    id: number;
    name: string;
    price: number;
    items_categories_id?: number;
    category?: ItemCategories
    shop_id: number;
    shop?: Shop;
    image?: string;
    description?: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
