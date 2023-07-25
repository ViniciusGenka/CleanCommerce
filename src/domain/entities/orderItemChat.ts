import OrderItemChatMessage from './orderItemChatMessage'

export default class OrderItemChat {
    public id: string | null;
    public orderItemId: string;
    public messages: OrderItemChatMessage[];
    public sellerId: string;
    public buyerId: string;

    constructor(
        buyerId: string,
        sellerId: string,
        messages: OrderItemChatMessage[] = [],
        id: string = null,
        orderItemId: string = null,
    ) {
        this.buyerId = buyerId;
        this.id = id;
        this.messages = messages;
        this.orderItemId = orderItemId;
        this.sellerId = sellerId;
    }
}
