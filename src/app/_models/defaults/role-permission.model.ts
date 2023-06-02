import { Permission, UserRole } from "@models";

export interface RolePermission {
  id: number;
  user_role_id: number;
  role?: UserRole;
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
