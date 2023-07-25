import { PlaceOrderDTO } from '../../domain/dtos/order/placeOrderDTO';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';

export default interface PlaceOrder {
	execute(
		destinationAddressId: string,
		productsToBuy: PlaceOrderDTO[],
		userId: string,
		discountCode?: string[],
	): Promise<OrderDTO>;
}
