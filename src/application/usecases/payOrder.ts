import { PayOrderDTO } from '../../domain/dtos/payment/payOrderDTO';

export default interface PayOrder {
	execute(
		orderId: string,
		paymentData: PayOrderDTO
	): Promise<{ response: { id: number } }>;
}
