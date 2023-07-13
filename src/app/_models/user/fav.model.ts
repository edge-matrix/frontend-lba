import { Items, Shop } from "@models";

export interface Fav {
  id: number;
  user_id: number;
  type: number;
  shop_id?: number;
  shop?: Shop;
  items_id?: number;
  item?: Items;
  status: number;
  created_at?: string;
  updated_at?: string;
}
