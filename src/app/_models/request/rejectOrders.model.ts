export interface RejectOrders {
    id: number;
    orderDetails_id: number;
    rejectedBy: string;
    reason: string;
    comment: string;
    isRefundable: number;
    refundstatus: number;
    refundAmout: string;
    created_at?: string;
    updated_at?: string;
}
