import { RolePermission } from "@models";

export interface UserRole {
    id: number;
    name: string;
    slug: string;
    description?: string;
    level: number;
    status: number;
    permission?: Array<RolePermission>;
    created_at?: string;
    updated_at?: string;
}
