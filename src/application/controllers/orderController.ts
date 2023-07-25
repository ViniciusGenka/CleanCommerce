import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import { PlaceOrderDTO } from '../../domain/dtos/order/placeOrderDTO';
import { PayOrderDTO } from '../../domain/dtos/payment/payOrderDTO';

export default interface OrderController {
	PlaceOrder(
		params: any,
		body: {
			destinationAddressId: string;
			products: PlaceOrderDTO[];
			userId: string;
		}
	): Promise<OrderDTO>;

	PayOrder(
		params: any,
		body: {
			paymentData: PayOrderDTO;
		}
	): Promise<{ response: { id: number } }>;

	GetOrderDetails(params: { id: string }, body: any): Promise<OrderDTO>;
}
