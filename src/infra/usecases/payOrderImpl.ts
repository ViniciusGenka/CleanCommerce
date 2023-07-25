import OrderRepository from '../../application/repositories/orderRepository';
import PaymentService from '../../domain/services/paymentService';
import PayOrder from '../../application/usecases/payOrder';
import { PayOrderDTO } from '../../domain/dtos/payment/payOrderDTO';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import CustomError from '../../application/errors/customApplicationError';

@injectable()
export default class PayOrderImpl implements PayOrder {
	private readonly orderRepository: OrderRepository;
	private readonly paymentService: PaymentService;

	constructor(
		@inject(TYPES.OrderRepository) orderRepository: OrderRepository,
		@inject(TYPES.PaymentService)
		paymentService: PaymentService
	) {
		this.paymentService = paymentService;
		this.orderRepository = orderRepository;
	}

	async execute(
		orderId: string,
		paymentData: PayOrderDTO
	): Promise<{ response: { id: number } }> {
		//fazer um validador dos dados de pagamento
		const orderEntity = await this.orderRepository.findOneOrderById(orderId);
		if (!orderEntity) throw new EntityNotFoundError("Order not found")
		let payment;
		if (paymentData.method === 'credit_card') {
			payment = await this.paymentService.authorizeCreditCardPayment(
				orderEntity,
				paymentData
			);
		}
		if (paymentData.method === 'pix') {
			payment = await this.paymentService.createPixPayment(
				orderEntity,
				paymentData
			);
		}
		orderEntity.payment.id = payment.response.id.toString();
		await this.orderRepository.saveOrder(orderEntity);
		return payment;
	}
}
