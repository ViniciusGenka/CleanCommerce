import OrderRepository from '../../application/repositories/orderRepository';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import GetOrderDetails from '../../application/usecases/getOrderDetails';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import OrderMapper from '../../application/mappers/orderMapper';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class GetOrderDetailsImpl implements GetOrderDetails {
	private orderRepository: OrderRepository;
	constructor(@inject(TYPES.OrderRepository) orderRepository: OrderRepository) {
		this.orderRepository = orderRepository;
	}

	async execute(orderId: string): Promise<OrderDTO> {
		const orderEntity = await this.orderRepository.findOneOrderById(orderId);
		if (!orderEntity) throw new EntityNotFoundError("Order not found")
		return OrderMapper.execute(orderEntity);
	}
}
