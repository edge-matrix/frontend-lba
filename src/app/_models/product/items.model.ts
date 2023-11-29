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
    nutrition_type: number;
    isVariants: number;
    variants: Array<{ id: number, name: string, price: number; type: number; quantity: number }>
    isAddon: number;
    locations: string;
    isPreBooking: number;
    prep_time: number;
    cooking_time: number;
    status: number;
    created_at?: string;
    updated_at?: string;
}
