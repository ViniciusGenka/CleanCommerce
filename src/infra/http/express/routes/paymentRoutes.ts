import ExpressAdapter from '../../../adapters/expressAdapter';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/inversify.types';
import PaymentController from '../../../../application/controllers/paymentController';

@injectable()
export default class PaymentRoutes {
	public router: Router;
	private paymentController: PaymentController;

	constructor(
		@inject(TYPES.PaymentController) paymentController: PaymentController
	) {
		this.paymentController = paymentController;
		this.router = Router();
		this.config();
	}

	private config(): void {
		this.router.post(
			'/webhooks',
			ExpressAdapter.execute(this.paymentController.notifyPaymentUpdate)
		);
	}
}
