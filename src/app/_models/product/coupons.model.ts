import { UsedCoupon } from "@models";

export interface Coupons {
    id: number;
    code: string;
    discount: number;
    discountType: number;
    type: string;
    canBeUsed: number;
    minAmount?: number;
    added_by: number;
    start_date: Date;
    duration: number;
    status: number;
    count?: Array<UsedCoupon>;
    created_at?: string;
    updated_at?: string;
}
