import { Shop } from "@models";

export interface ShopBankDetails {
    id: number;
    shop_id: number;
    shop?: Shop;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    name: string;
    upi: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
