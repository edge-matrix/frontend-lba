import { Shop } from "@models";

export interface ShopAddress {
    id: number;
    shop_id: number;
    shop?: Shop;
    addressLine: string;
    landmark?: string;
    lat: number;
    long: number;
    city: string;
    pincode: string;
    isStreetView?: boolean;
    status: number;
    created_at?: string;
    updated_at?: string;
}
