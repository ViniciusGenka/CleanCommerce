import Order from '../../../domain/entities/order';
import OrderRepository from '../../../application/repositories/orderRepository';
import { OrderStatus } from '../../../domain/enums/orderStatus';
import EntityNotFoundError from '../../../domain/errors/entityNotFoundError';
import { injectable } from 'inversify';
import crypto from 'crypto';

@injectable()
export default class OrderRepositoryInMemory implements OrderRepository {
	public orders: Order[] = [];

	async findOneOrderById(orderId: string): Promise<Order> {
		const order = this.orders.find((order) => order.id === orderId);
		if (!order) throw new EntityNotFoundError('Order not found');
		return order;
	}

	async findOrdersByUserId(userId: string): Promise<Order[]> {
		const order = this.orders.filter((order) => order.user.id === userId);
		if (order.length === 0)
			throw new EntityNotFoundError('User dont have any orders yet');
		return order;
	}

	async saveOrder(order: Order): Promise<Order> {
		order.id = crypto.randomUUID();
		this.orders.push(order);
		return order;
	}

	async updateOrderStatus(
		orderId: string,
		orderStatus: OrderStatus
	): Promise<Order> {
		for (let i = 0; i < this.orders.length; i++) {
			if (this.orders[i].id === orderId) {
				this.orders[i].status = orderStatus;
				return this.orders[i];
			}
		}
		throw new EntityNotFoundError('Order not found');
	}
}
