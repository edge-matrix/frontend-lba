export interface ShortLink {
    id: number;
    shortLink: string;
    link: string;
    count: number;
    type: number;
    relatedId?: number;
    status: number;
    created_at?: string;
    updated_at?: string;
}
