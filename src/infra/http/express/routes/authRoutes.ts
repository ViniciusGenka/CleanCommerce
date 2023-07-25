import AuthController from '../../../../application/controllers/authController';
import ExpressAdapter from '../../../adapters/expressAdapter';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/inversify.types';

@injectable()
export default class AuthRoutes {
	public router: Router;
	private authController: AuthController;

	constructor(@inject(TYPES.AuthController) authController: AuthController) {
		this.authController = authController;
		this.router = Router();
		this.config();
	}

	private config(): void {
		this.router.post(
			'/signup',
			ExpressAdapter.execute(this.authController.userSignUp)
		);
		this.router.post(
			'/signin',
			ExpressAdapter.execute(this.authController.userSignIn)
		);
	}
}
