export interface PaymentDetails {
    id?: number;
    orderDetails_id: number;
    transactionId: string;
    amount: number;
    paymentMethod: number;
    razorpay_payment_id: string;
    isReversed: number;
    status: number;
    created_at?: string;
    updated_at?: string;
}
