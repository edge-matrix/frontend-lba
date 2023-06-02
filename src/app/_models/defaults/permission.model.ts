export interface Permission {
  id: number;
  name: string;
  slug: string;
  description?: string;
  level: number;
  status: number;
  created_at?: string;
  updated_at?: string;
}
