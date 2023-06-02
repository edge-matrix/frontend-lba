import { Shop } from "@models";

export interface ShopSettings {
    id: number;
    shop_id: number;
    shop?: Shop;
    isPayLaterEnabled: number;
    isPayNowEnabled: number;
    chargeableTax: number;
    taxAmount: number;
    isBunkCoinEnabled: number;
    isDeliveryAvailble: number;
    created_at?: string;
    updated_at?: string;
}
