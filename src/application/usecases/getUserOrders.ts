import { OrderDTO } from '../../domain/dtos/order/orderDTO';

export default interface GetUserOrders {
	execute(userId: string): Promise<OrderDTO[]>;
}
