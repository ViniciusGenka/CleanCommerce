import AuthHandler from '../middlewares/authHandler';
import ExpressAdapter from '../../../adapters/expressAdapter';
import UserController from '../../../../application/controllers/userController';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/inversify.types';

@injectable()
export default class UserRoutes {
	public router: Router;
	private userController: UserController;
	private authHandler: AuthHandler;

	constructor(
		@inject(AuthHandler) authHandler: AuthHandler,
		@inject(TYPES.UserController) userController: UserController

	) {
		this.authHandler = authHandler
		this.userController = userController;
		this.router = Router();
		this.config();
	}

	private config(): void {
		this.router.get(
			'/:id',
			this.authHandler.execute,
			ExpressAdapter.execute(this.userController.getUserProfile)
		);
		this.router.patch(
			'/:id',
			this.authHandler.execute,
			ExpressAdapter.execute(this.userController.updateUserProfile)
		);
		this.router.get(
			'/:id/orders',
			this.authHandler.execute,
			ExpressAdapter.execute(this.userController.getUserOrders)
		);
		this.router.get(
			'/:id/addresses',
			this.authHandler.execute,
			ExpressAdapter.execute(this.userController.getUserAddresses)
		);
		this.router.post(
			'/:id/addresses',
			this.authHandler.execute,
			ExpressAdapter.execute(this.userController.addUserAddress)
		);
		this.router.post(
			'/roles',
			this.authHandler.execute,
			ExpressAdapter.execute(this.userController.addRolesToUsers)
		);
	}
}
