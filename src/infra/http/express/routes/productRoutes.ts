import AuthHandler from '../middlewares/authHandler';
import ExpressAdapter from '../../../adapters/expressAdapter';
import ProductController from '../../../../application/controllers/productController';
import { TYPES } from '../../../configs/inversify.types';
import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { requiredPermission } from '../middlewares/requirePermission';
import { Permissions } from '../../../../domain/enums/permissions';

@injectable()
export default class ProductRoutes {
	public router: Router;
	private productController: ProductController;
	private authHandler: AuthHandler;

	constructor(
		@inject(TYPES.ProductController) productController: ProductController,
		@inject(AuthHandler) authHandler: AuthHandler
	) {
		this.productController = productController;
		this.authHandler = authHandler;
		this.router = Router();
		this.config();
	}

	private config(): void {
		this.router.post(
			'/',
			this.authHandler.execute,
			requiredPermission(Permissions.ADD_PRODUCTS),
			ExpressAdapter.execute(this.productController.addProducts)
		);
		this.router.post(
			'/:id/reviews',
			this.authHandler.execute,
			ExpressAdapter.execute(this.productController.addProductReview)
		);
		this.router.post('/categories', this.authHandler.execute, ExpressAdapter.execute(this.productController.addCategories))
		this.router.get(
			'/:id/shipping',
			this.authHandler.execute,
			ExpressAdapter.execute(
				this.productController.getProductShippingEstimates
			)
		);
		this.router.get(
			'/:id',
			this.authHandler.execute,
			ExpressAdapter.execute(this.productController.getProductDetails)
		);
	}
}