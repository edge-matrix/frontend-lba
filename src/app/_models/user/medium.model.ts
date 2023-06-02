export interface Medium {
  id: number;
  user_id: number;
  type: number;
  value: string;
  isPrimary: number;
  isOnWhatsapp: number;
  access_code: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}
