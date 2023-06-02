import { Orders } from "@models";

export interface BookingDetails {
    id: number;
    orderDetails_id: string;
    order?: Orders;
    groupSize: number;
    bookingDate: string;
    startTime: string;
    endTime?: string;
    isTimeBound: number;
    note?: string;
    medium?: string;
    created_at?: string;
    updated_at?: string;
}
