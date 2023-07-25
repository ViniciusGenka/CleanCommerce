import { OrderItemChatMessageDTO } from "./orderItemChatMessageDTO";

export type OrderItemChatDTO = {
    id: string | null;
    orderItemId: string;
    messages: OrderItemChatMessageDTO[];
    sellerId: string;
    buyerId: string;
}