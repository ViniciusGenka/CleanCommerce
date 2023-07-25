import { OrderDTO } from '../../domain/dtos/order/orderDTO';

export default interface GetOrderDetails {
	execute(orderId: string): Promise<OrderDTO>;
}
