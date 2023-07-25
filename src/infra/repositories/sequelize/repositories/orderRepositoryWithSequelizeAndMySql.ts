import Order from '../../../../domain/entities/order';
import OrderRepository from '../../../../application/repositories/orderRepository';
import { injectable } from 'inversify';
import { OrderSchemaEntityMapper } from '../mappers/orderSchemaEntityMapper';
import { OrderItemSchemaEntityMapper } from '../mappers/orderItemSchemaEntityMapper';
import { OrderItemSchema } from '../schemas/orderItemSchema';
import { OrderSchema } from '../schemas/orderSchema';
import { AddressSchema } from '../schemas/addressSchema';
import { OrderStatus } from '../../../../domain/enums/orderStatus';
import { UserSchema } from '../schemas/userSchema';
import EntityNotFoundError from '../../../../domain/errors/entityNotFoundError';
import { OrderDiscountCouponsSchema } from '../schemas/orderDiscountCouponsSchema';
import { OrderItemChatSchemaEntityMapper } from '../mappers/orderItemChatSchemaEntityMapper';
import { OrderItemChatSchema } from '../schemas/orderItemChatSchema';
import OrderItemChat from '../../../../domain/entities/orderItemChat';
import { OrderItemChatMessageSchema } from '../schemas/orderItemChatMessageSchema';
import OrderItemChatMessage from '../../../../domain/entities/orderItemChatMessage';
import { OrderItemChatMessageSchemaEntityMapper } from '../mappers/orderItemChatMessageSchemaEntityMapper';
import OrderItem from '../../../../domain/entities/orderItem';

@injectable()
export default class OrderRepositoryWithSequelizeAndMySql
	implements OrderRepository {
	async findOneOrderById(orderId: string): Promise<Order | null> {
		const orderSchema = await OrderSchema.findByPk(orderId, {
			include: [
				{
					model: AddressSchema,
					as: 'destinationAddress',
				},
				{
					model: OrderItemSchema,
					as: 'items',
					include: [
						{
							model: AddressSchema,
							as: 'stockAddress',
						},
					],
				},
				{
					model: UserSchema,
					as: 'user',
				},
			],
		});
		if (!orderSchema) return null;
		return OrderSchemaEntityMapper.schemaToEntity(orderSchema);
	}

	async findOrdersByUserId(userId: string): Promise<Order[]> {
		const orderSchemas = await OrderSchema.findAll({
			where: { userId: userId },
			include: [
				{
					model: AddressSchema,
					as: 'destinationAddress',
				},
				{
					model: OrderItemSchema,
					as: 'items',
					include: [
						{
							model: AddressSchema,
							as: 'stockAddress',
						},
					],
				},
				{
					model: UserSchema,
					as: 'user',
				},
			],
		});
		return OrderSchemaEntityMapper.schemasToEntities(orderSchemas);
	}

	async saveOrder(orderEntity: Order): Promise<Order> {
		const orderSchema = OrderSchemaEntityMapper.entityToSchema(orderEntity);
		const savedOrderSchema = await orderSchema.save();
		const orderItemEntities = orderEntity.items.map((item) => {
			item.orderId = savedOrderSchema.id;
			return item;
		});
		const orderItemSchemas = OrderItemSchemaEntityMapper.entitiesToSchemas(orderItemEntities);
		for (let i = 0; i < orderItemSchemas.length; i++) {
			const savedOrderItem = await orderItemSchemas[i].save();
			const orderItemChatEntity = orderEntity.items[i].chat;
			orderItemChatEntity.orderItemId = savedOrderItem.id;
			const orderItemChatSchema = OrderItemChatSchemaEntityMapper.entityToSchema(orderItemChatEntity);
			await orderItemChatSchema.save();
		}
		const fullOrderSchema = await OrderSchema.findByPk(savedOrderSchema.id, {
			include: [
				{
					model: AddressSchema,
					as: 'destinationAddress',
				},
				{
					model: OrderItemSchema,
					as: 'items',
					include: [
						{
							model: AddressSchema,
							as: 'stockAddress',
						},
						{
							model: OrderItemChatSchema,
							as: 'chat',
						},
					],
				},
				{
					model: UserSchema,
					as: 'user',
				},
			],
		});
		for (let i = 0; i < orderEntity.discountCoupons.length; i++) {
			const orderDiscountCouponsSchema = OrderDiscountCouponsSchema.build({
				orderId: savedOrderSchema.id,
				discountCouponId: orderEntity.discountCoupons[i].id
			})
			await orderDiscountCouponsSchema.save();
		}
		return OrderSchemaEntityMapper.schemaToEntity(fullOrderSchema);
	}

	async findOneOrderByPaymentId(paymentId: string): Promise<Order | null> {
		const orderSchema = await OrderSchema.findOne({
			where: { paymentId: paymentId },
			include: [
				{
					model: AddressSchema,
					as: 'destinationAddress',
				},
				{
					model: OrderItemSchema,
					as: 'items',
					include: [
						{
							model: AddressSchema,
							as: 'stockAddress',
						},
					],
				},
				{
					model: UserSchema,
					as: 'user',
				},
			],
		});
		if (!orderSchema) return null;
		return OrderSchemaEntityMapper.schemaToEntity(orderSchema);
	}

	async updateOrderStatus(
		orderId: string,
		orderStatus: OrderStatus
	): Promise<Order> {
		const orderSchema = await OrderSchema.findByPk(orderId);
		if (!orderSchema) throw new EntityNotFoundError("Order not found")
		orderSchema.status = orderStatus;
		await orderSchema.save();
		const updatedOrderSchema = await OrderSchema.findByPk(orderId, {
			include: [
				{
					model: AddressSchema,
					as: 'destinationAddress',
				},
				{
					model: OrderItemSchema,
					as: 'items',
					include: [
						{
							model: AddressSchema,
							as: 'stockAddress',
						},
					],
				},
				{
					model: UserSchema,
					as: 'user',
				},
			],
		});
		return OrderSchemaEntityMapper.schemaToEntity(updatedOrderSchema);
	}

	async findOneOrderItemById(orderItemId: string): Promise<OrderItem> {
		const orderItemSchema = await OrderItemSchema.findByPk(orderItemId, {
			include: [
				{
					model: OrderItemChatSchema,
					as: 'chat'
				}
			]
		});
		if (!orderItemSchema) return null;
		return OrderItemSchemaEntityMapper.schemaToEntity(orderItemSchema);
	}

	async findOneOrderItemChatByOrderItemId(orderItemId: string): Promise<OrderItemChat> {
		const orderItemChatSchema = await OrderItemChatSchema.findOne({ where: { orderItemId: orderItemId } });
		if (!orderItemChatSchema) return null;
		return OrderItemChatSchemaEntityMapper.schemaToEntity(orderItemChatSchema);
	}

	async findOneOrderItemChatById(orderItemChatId: string): Promise<OrderItemChat> {
		const orderItemChatSchema = await OrderItemChatSchema.findByPk(orderItemChatId);
		if (!orderItemChatSchema) return null;
		return OrderItemChatSchemaEntityMapper.schemaToEntity(orderItemChatSchema);
	}

	async saveOrderItemChatMessage(orderItemChatId: string, text: string, userId: string): Promise<OrderItemChatMessage> {
		const orderItemChatMessageSchema = OrderItemChatMessageSchema.build({
			chatId: orderItemChatId,
			text: text,
			userId: userId,
		});
		const savedOrderItemChatMessageSchema = await orderItemChatMessageSchema.save();
		return OrderItemChatMessageSchemaEntityMapper.schemaToEntity(savedOrderItemChatMessageSchema);
	}
}
