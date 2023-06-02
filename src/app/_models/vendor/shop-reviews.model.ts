import { Shop, User } from "@models";

export interface ShopReviews {
    id: number;
    shop_id: number;
    shop?: Shop;
    user_id: number;
    user?: User;
    review: string;
    rate: number;
    verified: number;
    images?: string;
    tags: string;
    likes: number;
    reply?: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
