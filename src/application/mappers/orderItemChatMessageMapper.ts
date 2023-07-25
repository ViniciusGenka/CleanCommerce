import OrderItemChatMessage from '../../domain/entities/orderItemChatMessage';
import { OrderItemChatMessageDTO } from '../../domain/dtos/order/orderItemChatMessageDTO';

export default class OrderItemChatMessageMapper {
    static execute(orderItemChatMessageEntity: OrderItemChatMessage): OrderItemChatMessageDTO {
        return {
            id: orderItemChatMessageEntity.id,
            userId: orderItemChatMessageEntity.userId,
            chatId: orderItemChatMessageEntity.chatId,
            text: orderItemChatMessageEntity.text,
        };
    }
}
