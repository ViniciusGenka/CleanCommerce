import { inject, injectable } from 'inversify';
import NotifyPaymentUpdate from '../../application/usecases/notifyPaymentUpdate';
import { TYPES } from '../configs/inversify.types';
import PaymentService from '../../domain/services/paymentService';

@injectable()
export default class NotifyPaymentUpdateImpl implements NotifyPaymentUpdate {
	private paymentService: PaymentService;
	constructor(
		@inject(TYPES.PaymentService) paymentService: PaymentService
	) {
		this.paymentService = paymentService
	}
	async execute(paymentNotification: any): Promise<void> {
		this.paymentService.processPaymentNotification(paymentNotification);
	}
}
