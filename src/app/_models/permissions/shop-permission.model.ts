import { Permission, Shop } from "@models";

export interface ShopPermission {
  id: number;
  shop_id: number;
  shop?: Shop;
  permission_id?: number;
  permission?: Permission;
  isAvailable: number;
  isView: number;
  isAdd: number;
  isEdit: number;
  isDelete: number;
  status: number;
  created_at?: string;
  updated_at?: string;
}
