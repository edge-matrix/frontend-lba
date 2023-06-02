export interface Notification {
  id: number;
  user_id: number;
  title: string;
  description: string;
  link: string;
  status: number;
  created_at: string;
  updated_at?: string;
}
