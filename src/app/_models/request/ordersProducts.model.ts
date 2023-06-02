import { Combos } from "../product/combos.model";
import { Items } from "../product/items.model";

export interface OrdersProducts {
    id: number;
    orderDetails_id: number;
    name?: string;
    items_id: number;
    item?: Items
    combos_id: number;
    combo?: Combos
    type: number;
    price: number;
    quantity: number;
    image?: string;
    isAddOn: number;
    created_at?: string;
    updated_at?: string;
}
