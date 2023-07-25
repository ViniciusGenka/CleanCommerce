import { CaptureCreditCardPaymentResponseDTO } from '../dtos/payment/captureCreditCardPaymentResponseDTO';
import Order from '../entities/order';

export default interface PaymentService {
	authorizeCreditCardPayment(
		order: Order,
		paymentData: object
	): Promise<{ response: { id: number } }>;
	captureCreditCardPayment(
		paymentId: number
	): Promise<CaptureCreditCardPaymentResponseDTO>;
	createPixPayment(
		order: Order,
		paymentData: object
	): Promise<{ response: { id: number } }>;
	processPaymentNotification(paymentNotification: object): Promise<void>;
}
