import { ComboItems, Shop } from "@models";

export interface Combos {
    id: number;
    name: string;
    slug: string;
    image?: string;
    coverImage?: string;
    description: string;
    price: number;
    discount: number;
    groupSize: number;
    items: Array<ComboItems>;
    shop_id: number;
    shop?: Shop;
    tags: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
