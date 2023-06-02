import { User } from "../user/user.model";
import { Coupons } from "./coupons.model";

export interface UsedCoupon {
    id: number;
    coupon_id: number;
    coupon?: Coupons;
    user_id: number;
    user?: User;
    used_date: string;
    created_at?: string;
    updated_at?: string;
}
