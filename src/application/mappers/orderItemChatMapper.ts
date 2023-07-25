import OrderItemChat from '../../domain/entities/orderItemChat';
import { OrderItemChatDTO } from '../../domain/dtos/order/orderItemChatDTO';
import OrderItemChatMessageMapper from './orderItemChatMessageMapper';

export default class OrderItemChatMapper {
    static execute(orderItemChatEntity: OrderItemChat): OrderItemChatDTO {
        return {
            id: orderItemChatEntity.id,
            buyerId: orderItemChatEntity.buyerId,
            sellerId: orderItemChatEntity.sellerId,
            orderItemId: orderItemChatEntity.orderItemId,
            messages: orderItemChatEntity.messages.map(message => OrderItemChatMessageMapper.execute(message))
        };
    }
}
