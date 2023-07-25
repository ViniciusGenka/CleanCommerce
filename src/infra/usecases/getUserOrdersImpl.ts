import OrderMapper from '../../application/mappers/orderMapper';
import OrderRepository from '../../application/repositories/orderRepository';
import UserRepository from '../../application/repositories/userRepository';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import GetUserOrders from '../../application/usecases/getUserOrders';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class GetUserOrdersImpl implements GetUserOrders {
	private orderRepository: OrderRepository;
	private userRepository: UserRepository;
	constructor(
		@inject(TYPES.OrderRepository) orderRepository: OrderRepository,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.orderRepository = orderRepository;
		this.userRepository = userRepository;
	}
	async execute(userId: string): Promise<OrderDTO[]> {
		const userNotFound = !(await this.userRepository.findOneUserById(userId));
		if (userNotFound) throw new EntityNotFoundError("User not found")
		const orderEntities = await this.orderRepository.findOrdersByUserId(userId);
		const ordersResponse: OrderDTO[] = [];
		orderEntities.forEach((orderEntity) => {
			ordersResponse.push(OrderMapper.execute(orderEntity));
		});
		return ordersResponse;
	}
}
