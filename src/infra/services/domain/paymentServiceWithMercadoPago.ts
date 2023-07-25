import PaymentService from '../../../domain/services/paymentService';
import mercadopago from 'mercadopago';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';
import { inject, injectable } from 'inversify';
import Order from '../../../domain/entities/order';
import { CaptureCreditCardPaymentResponseDTO } from '../../../domain/dtos/payment/captureCreditCardPaymentResponseDTO';
import { OrderStatus } from '../../../domain/enums/orderStatus';
import { TYPES } from '../../configs/inversify.types';
import OrderRepository from '../../../application/repositories/orderRepository';

@injectable()
export default class PaymentServiceWithMercadoPago implements PaymentService {
	private orderRepository: OrderRepository;
	constructor(@inject(TYPES.OrderRepository) orderRepository: OrderRepository) {
		this.orderRepository = orderRepository;
		this.config();
	}

	config() {
		mercadopago.configurations.setAccessToken(
			'TEST-4514449124593092-032422-b5036549ab7011eca2874d14551aecaf-64391125'
		);
	}

	async authorizeCreditCardPayment(
		order: Order,
		paymentData: {
			method: string;
			payment_method_id?: string;
			issuer_id?: string;
			token?: string;
			installments?: string;
			identificationNumber?: string;
			identificationType?: string;
			payer?: {
				email: string;
				identification: {
					type: string;
					number: string;
				};
			};
		}
	): Promise<{ response: { id: number } }> {
		const payment: CreatePaymentPayload = {
			additional_info: {
				items: order.items.map((item) => {
					return {
						title: item.title,
						quantity: item.quantity,
						unit_price: item.price,
					};
				}),
			},
			transaction_amount: order.discountedPrice,
			token: paymentData.token,
			description: 'Compra',
			installments: parseInt(paymentData.installments),
			issuer_id: paymentData.issuer_id,
			notification_url: process.env.MERCADOPAGO_PAYMENT_NOTIFICATION_URL,
			payment_method_id: paymentData.payment_method_id,
			payer: paymentData.payer,
			capture: false,
		};

		return mercadopago.payment.create(payment);
	}

	createPixPayment(
		order: Order,
		paymentData: {
			method: string;
			payment_method_id?: string;
			payer?: {
				email: string;
				identification: {
					type: string;
					number: string;
				};
			};
		}
	): Promise<{
		response: {
			id: number;
			point_of_interaction: {
				transaction_data: {
					qr_code_base64: string;
					qr_code: string;
					ticket_url: string;
				};
			};
		};
	}> {
		const payment: CreatePaymentPayload = {
			additional_info: {
				items: order.items.map((item) => {
					return {
						title: item.title,
						quantity: item.quantity,
						unit_price: item.price,
					};
				}),
			},
			transaction_amount: order.discountedPrice,
			description: 'Compra',
			installments: 1,
			notification_url: process.env.MERCADOPAGO_PAYMENT_NOTIFICATION_URL,
			payment_method_id: paymentData.payment_method_id,
			payer: paymentData.payer,
		};

		return mercadopago.payment.create(payment);
	}

	async captureCreditCardPayment(
		paymentId: number
	): Promise<CaptureCreditCardPaymentResponseDTO> {
		return mercadopago.payment.capture(paymentId);
	}

	async processPaymentNotification(paymentNotification: {
		action: string;
		api_version: string;
		data: {
			id: string;
		};
		date_created: string;
		id: number;
		live_mode: boolean;
		type: string;
		user_id: string;
	}): Promise<void> {
		console.log(paymentNotification);
		const payment = await mercadopago.payment.get(
			parseInt(paymentNotification.data.id)
		);
		if (
			payment.response.status === 'authorized' &&
			payment.response.status_detail === 'pending_capture'
		) {
			await this.captureCreditCardPayment(
				parseInt(paymentNotification.data.id)
			);
		}
		if (
			payment.response.status === 'approved' &&
			payment.response.status_detail === 'accredited'
		) {
			const order = await this.orderRepository.findOneOrderByPaymentId(
				payment.response.id
			);
			const updatedOrder = await this.orderRepository.updateOrderStatus(
				order.id,
				OrderStatus.APPROVED
			);
		}
	}
}
