import { Shop } from "@models";

export interface ShopTaxes {
    id: number;
    shop_id: number;
    shop?: Shop;
    tax_name: string;
    tax_amount: number;
    isIncluded: number;
    status: number;
    created_at?: string;
    updated_at?: string;
}
