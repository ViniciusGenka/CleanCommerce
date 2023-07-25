import ExpressAdapter from '../../../adapters/expressAdapter';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/inversify.types';
import OrderController from '../../../../application/controllers/orderController';
import AuthHandler from '../middlewares/authHandler';

@injectable()
export default class OrderRoutes {
	public router: Router;
	private orderController: OrderController;
	private authHandler: AuthHandler;

	constructor(
		@inject(AuthHandler) authHandler: AuthHandler,
		@inject(TYPES.OrderController) OrderController: OrderController
	) {
		this.authHandler = authHandler;
		this.orderController = OrderController;
		this.router = Router();
		this.config();
	}

	private config(): void {
		this.router.post(
			'/',
			this.authHandler.execute,
			ExpressAdapter.execute(this.orderController.PlaceOrder)
		);
		this.router.post(
			'/:id/pay',
			ExpressAdapter.execute(this.orderController.PayOrder)
		);
		this.router.get(
			'/:id',
			ExpressAdapter.execute(this.orderController.GetOrderDetails)
		);
	}
}
