import { User } from "@models";

export interface UserSettings {
    id: number;
    user_id: number;
    user?: User;
    isNotificationEnable: number;
    isAppInstallation: number;
    created_at?: string;
    updated_at?: string;
}
