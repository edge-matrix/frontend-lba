import { Combos, Items } from "@models";

export interface ComboItems {
    id: number;
    combos_id: number;
    combos?: Combos;
    items_id: number;
    item?: Items;
    quantity: number;
    status: number;
    created_at?: string;
    updated_at?: string;
}
