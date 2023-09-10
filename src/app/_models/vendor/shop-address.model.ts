import { Shop, ShopCategories } from "@models";

export interface ShopAddress {
    iid: number;
    shop_id: number;
    shop?: Shop;
    addressLine: string;
    landmark?: string;
    mapLink?: string;
    lat: number;
    long: number;
    city: string;
    pincode: string;
    isStreetView?: boolean;
    shop_categories_id: number;
    category?: ShopCategories;
    status: number;
    created_at?: string;
    updated_at?: string;
}
