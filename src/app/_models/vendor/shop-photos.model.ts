import { Shop } from "./shop.model";

export interface ShopPhotos {
    id: number;
    shop_id: number;
    shop?: Shop;
    isLink: number;
    isImage: number;
    isUploadedByAdmin: number;
    image: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
