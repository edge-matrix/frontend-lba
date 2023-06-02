import { User } from "./user.model";

export interface BunkCoins {
    id: number;
    accountId: string;
    user_id: string;
    user?: User
    bunkCoin: number;
    status: number;
    created_at?: string;
    updated_at?: string;
}
