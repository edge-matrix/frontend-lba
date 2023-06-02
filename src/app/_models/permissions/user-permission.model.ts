import { Permission, User } from "@models";

export interface UserPermission {
  id: number;
  users_id: number;
  user?: User;
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
