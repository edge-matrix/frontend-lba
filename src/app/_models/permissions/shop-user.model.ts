import { Shop, User } from "@models";

export interface ShopUser {
    id: number;
    users_id: number;
    user?: User;
    shop_id: number;
    shop?: Shop;
    position?: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
