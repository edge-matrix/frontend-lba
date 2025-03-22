import { Items, Shop } from "@models";

export interface Cart{
  itemId: number;
  isVariantSelected: boolean;
  variant?: { id: number, name: string, price: number; type: number; quantity: number };
  itemDetails: Items;
  shop_id: number;
  type: string;
  quantity: number;
  date: string;
}
