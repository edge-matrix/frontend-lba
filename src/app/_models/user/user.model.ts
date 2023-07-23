import { UserRole } from "../defaults/user-role.model";
import { ShopUser } from "../permissions/shop-user.model";

export interface User {
    id: number;
    name: string;
    isNameReal: number;
    profileImage?: string;
    username: string;
    password?: string;
    user_role_id: number;
    role?: UserRole;
    shop?: ShopUser;
    token?: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
