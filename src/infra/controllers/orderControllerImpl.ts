import OrderController from '../../application/controllers/orderController';
import PlaceOrder from '../../application/usecases/placeOrder';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import PayOrder from '../../application/usecases/payOrder';
import { TYPES } from '../configs/inversify.types';
import { PayOrderDTO } from '../../domain/dtos/payment/payOrderDTO';
import { inject, injectable } from 'inversify';
import { PlaceOrderDTO } from '../../domain/dtos/order/placeOrderDTO';
import GetOrderDetails from '../../application/usecases/getOrderDetails';

@injectable()
export default class OrderControllerImpl implements OrderController {
	private getOrderDetailsUseCase: GetOrderDetails;
	private placeOrderUseCase: PlaceOrder;
	private payOrderUseCase: PayOrder;

	constructor(
		@inject(TYPES.GetOrderDetails) getOrderDetailsUseCase: GetOrderDetails,
		@inject(TYPES.PlaceOrder) placeOrderUseCase: PlaceOrder,
		@inject(TYPES.PayOrder) payOrderUseCase: PayOrder
	) {
		this.getOrderDetailsUseCase = getOrderDetailsUseCase;
		this.payOrderUseCase = payOrderUseCase;
		this.placeOrderUseCase = placeOrderUseCase;
	}

	PlaceOrder = async (
		params: any,
		body: {
			destinationAddressId: string;
			products: PlaceOrderDTO[];
			userId: string;
		}
	): Promise<OrderDTO> => {
		const userId = params.userId;
		const destinationAddressId = body.destinationAddressId;
		const productsToBuy: PlaceOrderDTO[] = body.products;
		return this.placeOrderUseCase.execute(
			destinationAddressId,
			productsToBuy,
			userId
		);
	};

	PayOrder = async (
		params: any,
		body: {
			paymentData: PayOrderDTO;
		}
	): Promise<{ response: { id: number } }> => {
		const orderId = params.id;
		const paymentData = body.paymentData;
		return this.payOrderUseCase.execute(orderId, paymentData);
	};

	GetOrderDetails = async (
		params: { id: string },
		body: any
	): Promise<OrderDTO> => {
		const orderId = params.id;
		return this.getOrderDetailsUseCase.execute(orderId);
	};
}
