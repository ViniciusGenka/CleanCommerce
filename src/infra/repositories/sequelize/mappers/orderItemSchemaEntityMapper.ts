import OrderItem from '../../../../domain/entities/orderItem';
import { OrderItemSchema } from '../schemas/orderItemSchema';
import { AddressSchemaEntityMapper } from './addressSchemaEntityMapper';
import { OrderItemChatSchemaEntityMapper } from './orderItemChatSchemaEntityMapper';

export class OrderItemSchemaEntityMapper {
	static schemaToEntity(orderItemSchema: OrderItemSchema): OrderItem {
		const orderItemChatEntity = OrderItemChatSchemaEntityMapper.schemaToEntity(orderItemSchema.chat)
		return new OrderItem(
			orderItemChatEntity,
			orderItemSchema.estimatedShippingTime,
			orderItemSchema.price,
			orderItemSchema.quantity,
			orderItemSchema.stockAddress,
			orderItemSchema.title,
			orderItemSchema.id,
			orderItemSchema.orderId,
		);
	}

	static entitiesToSchemas(
		orderItemEntities: OrderItem[],
	): OrderItemSchema[] {
		let orderItemSchemas: OrderItemSchema[] = [];
		for (let i = 0; i < orderItemEntities.length; i++) {
			const orderItemSchema = OrderItemSchema.build({
				orderId: orderItemEntities[i].orderId,
				stockAddressId: orderItemEntities[i].stockAddress.id,
				estimatedShippingTime: orderItemEntities[i].estimatedShippingTime,
				price: orderItemEntities[i].price,
				quantity: orderItemEntities[i].quantity,
				title: orderItemEntities[i].title,
			});
			orderItemSchemas.push(orderItemSchema);
		}
		return orderItemSchemas;
	}

	static schemasToEntities(orderItemSchemas: OrderItemSchema[]): OrderItem[] {
		let orderItemEntities: OrderItem[] = [];
		for (let i = 0; i < orderItemSchemas.length; i++) {
			const stockAddressEntity = AddressSchemaEntityMapper.schemaToEntity(
				orderItemSchemas[i].stockAddress
			);
			const orderItemChatEntity = OrderItemChatSchemaEntityMapper.schemaToEntity(orderItemSchemas[i].chat)
			const orderItemEntity = new OrderItem(
				orderItemChatEntity,
				orderItemSchemas[i].estimatedShippingTime,
				orderItemSchemas[i].price,
				orderItemSchemas[i].quantity,
				stockAddressEntity,
				orderItemSchemas[i].title,
				orderItemSchemas[i].id,
				orderItemSchemas[i].orderId
			);
			orderItemEntities.push(orderItemEntity);
		}
		return orderItemEntities;
	}
}
