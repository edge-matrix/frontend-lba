import { BookingDetails, Coupons, OrdersProducts, PaymentDetails, RejectOrders, Shop, User } from "@models";

export interface Orders {
    id: number;
    orderId: string;
    user_id: number;
    user?: User;
    shop_id: number;
    shop?: Shop;
    subTotal: number;
    taxAmount: number;
    discount: number;
    coinRedeemed: number;
    coupon_id?: number;
    coupon?: Coupons;
    grandTotal: number,
    paidAmount: number,
    payableAmount: number;
    paymentStatus: number;
    paymentMethod: number;
    orderType: number;
    status: number;
    booking_details?: BookingDetails;
    products?: Array<OrdersProducts>;
    payment_details?: PaymentDetails;
    reject_order?: RejectOrders;
    created_at?: string;
    updated_at?: string;
}
