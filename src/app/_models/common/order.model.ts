export interface CreateOrder{
  user_id: number;
  name?: string;
  shop_id: number;
  coupon_id?: number;

  groupSize: number;
  bookingDate: string;
  startTime: string;
  endTime?: string;
  isTimeBound: number;
  note?: string;
  medium?: string;

  paymentStatus: number;
  paymentMethod: number;
  orderType: number;
  coinRedeemed?: number;

  combos?: string;
  comboQuantity?: string;
  items?: string;
  items_variant?: string;
  items_addon?: string;
  itemsQuantity?: string;
}
