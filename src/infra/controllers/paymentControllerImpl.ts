import PaymentController from '../../application/controllers/paymentController';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import NotifyPaymentUpdate from '../../application/usecases/notifyPaymentUpdate';

@injectable()
export default class PaymentControllerImpl implements PaymentController {
	private notifyPaymentUpdateUseCase: NotifyPaymentUpdate;

	constructor(
		@inject(TYPES.NotifyPaymentUpdate)
		notifyPaymentUpdateUseCase: NotifyPaymentUpdate
	) {
		this.notifyPaymentUpdateUseCase = notifyPaymentUpdateUseCase;
	}

	notifyPaymentUpdate = async (params: any, body: any): Promise<void> => {
		const paymentNotification = body;
		this.notifyPaymentUpdateUseCase.execute(paymentNotification);
	};
}
