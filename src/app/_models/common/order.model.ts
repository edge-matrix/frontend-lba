export interface CreateOrder{
  user_id: number;
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
  itemsQuantity?: string;
  addOns?: string;
  addOnsQuantity?: string;
}
