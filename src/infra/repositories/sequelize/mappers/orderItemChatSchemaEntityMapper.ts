import OrderItemChat from '../../../../domain/entities/orderItemChat';
import orderItemChat from '../../../../domain/entities/orderItemChat';
import { OrderItemChatSchema } from '../schemas/orderItemChatSchema';

export class OrderItemChatSchemaEntityMapper {
    static schemaToEntity(orderItemChatSchema: OrderItemChatSchema): OrderItemChat {
        return new orderItemChat(
            orderItemChatSchema.buyerId,
            orderItemChatSchema.sellerId,
            orderItemChatSchema?.messages,
            orderItemChatSchema.id,
            orderItemChatSchema.orderItemId,
        );
    }

    static entityToSchema(
        orderItemChatEntity: OrderItemChat
    ): OrderItemChatSchema {
        return OrderItemChatSchema.build({
            buyerId: orderItemChatEntity.buyerId,
            sellerId: orderItemChatEntity.sellerId,
            orderItemId: orderItemChatEntity.orderItemId
        });
    }

    static entitiesToSchemas(
        orderItemChatEntities: OrderItemChat[]
    ): OrderItemChatSchema[] {
        let orderItemChatSchemas: OrderItemChatSchema[] = [];
        for (let i = 0; i < orderItemChatEntities.length; i++) {
            const orderItemChatSchema = OrderItemChatSchema.build({
                buyerId: orderItemChatEntities[i].buyerId,
                sellerId: orderItemChatEntities[i].sellerId,
                orderItemId: orderItemChatEntities[i].orderItemId
            });
            orderItemChatSchemas.push(orderItemChatSchema);
        }
        return orderItemChatSchemas;
    }

    static schemasToEntities(orderItemChatSchemas: OrderItemChatSchema[]): OrderItemChat[] {
        let orderItemChatEntities: OrderItemChat[] = [];
        for (let i = 0; i < orderItemChatSchemas.length; i++) {
            const orderItemChatEntity = new orderItemChat(
                orderItemChatSchemas[i].buyerId,
                orderItemChatSchemas[i].sellerId,
                orderItemChatSchemas[i]?.messages,
                orderItemChatSchemas[i].id,
                orderItemChatSchemas[i].orderItemId,
            );
            orderItemChatEntities.push(orderItemChatEntity);
        }
        return orderItemChatEntities;
    }
}
