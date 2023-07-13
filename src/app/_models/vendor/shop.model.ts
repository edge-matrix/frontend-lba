import { Combos } from "../product/combos.model";
import { Items } from "../product/items.model";
import { ShopSettings } from "../settings/shop-settings.model";
import { User } from "../user/user.model";
import { ShopAddress } from "./shop-address.model";
import { ShopCategories } from "./shop-categories.model";
import { ShopPhotos } from "./shop-photos.model";
import { ShopReviews } from "./shop-reviews.model";
import { Shoptimings } from "./shop-timings.model";

export interface Shop {
    id: number;
    title: string;
    slug: string;
    code: string;
    profileImage?: string;
    shop_categories_id: number;
    category?: ShopCategories;
    verified: number;
    about: string;
    speciality?: string;
    popularDishes?: string;
    peoplesPoint?: string;
    note?: string;
    address?: Array<ShopAddress>;
    combos: Array<Combos>;
    items: Array<Items>;
    shop_reviews: Array<ShopReviews>;
    photos: Array<ShopPhotos>;
    timings: Array<Shoptimings>;
    settings?: ShopSettings;
    status: number;
    tags: string;
    accommodations: string;
    created_at?: string;
    updated_at?: string;
}
