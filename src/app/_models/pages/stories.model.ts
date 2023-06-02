export interface Stories {
    id: number;
    title: string;
    slug: string;
    details: string;
    type: number;
    image?: string;
    hashTags: string;
    author?: string;
    status: number;
    created_at?: string;
    updated_at?: string;
}
