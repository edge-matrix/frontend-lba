import { Items, Shop } from "@models";

export interface Cart{
  itemId: number;
  itemDetails: Items;
  shop_id: number;
  shop: Shop;
  type: string;
  quantity: number;
  date: string;
}
