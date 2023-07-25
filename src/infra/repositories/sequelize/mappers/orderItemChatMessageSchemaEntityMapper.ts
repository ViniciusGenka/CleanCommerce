import OrderItemChatMessage from '../../../../domain/entities/orderItemChatMessage';
import orderItemChatMessage from '../../../../domain/entities/orderItemChatMessage';
import { OrderItemChatMessageSchema } from '../schemas/orderItemChatMessageSchema';

export class OrderItemChatMessageSchemaEntityMapper {
    static schemaToEntity(orderItemChatMessageSchema: OrderItemChatMessageSchema): OrderItemChatMessage {
        return new orderItemChatMessage(
            orderItemChatMessageSchema.chatId,
            orderItemChatMessageSchema.text,
            orderItemChatMessageSchema.userId,
            orderItemChatMessageSchema.id,
        );
    }

    static entitiesToSchemas(
        orderItemChatMessageEntities: OrderItemChatMessage[]
    ): OrderItemChatMessageSchema[] {
        let orderItemChatMessageSchemas: OrderItemChatMessageSchema[] = [];
        for (let i = 0; i < orderItemChatMessageEntities.length; i++) {
            const orderItemChatMessageSchema = OrderItemChatMessageSchema.build({
                chatId: orderItemChatMessageEntities[i].chatId,
                text: orderItemChatMessageEntities[i].text,
                userId: orderItemChatMessageEntities[i].userId
            });
            orderItemChatMessageSchemas.push(orderItemChatMessageSchema);
        }
        return orderItemChatMessageSchemas;
    }

    static schemasToEntities(orderItemChatMessageSchemas: OrderItemChatMessageSchema[]): OrderItemChatMessage[] {
        let orderItemChatMessageEntities: OrderItemChatMessage[] = [];
        for (let i = 0; i < orderItemChatMessageSchemas.length; i++) {
            const orderItemChatMessageEntity = new orderItemChatMessage(
                orderItemChatMessageSchemas[i].chatId,
                orderItemChatMessageSchemas[i].text,
                orderItemChatMessageSchemas[i].userId,
                orderItemChatMessageSchemas[i].id,
            );
            orderItemChatMessageEntities.push(orderItemChatMessageEntity);
        }
        return orderItemChatMessageEntities;
    }
}
