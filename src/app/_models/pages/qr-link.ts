export interface QrLink {
  id: number;
  shortLink: string;
  link: string;
  type: number;
  relatedId?: number;
  count: number;
  status: number;
  created_at?: string;
  updated_at?: string;
}
