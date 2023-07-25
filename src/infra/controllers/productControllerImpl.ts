import AddProducts from '../../application/usecases/addProducts';
import AddProductReview from '../../application/usecases/addProductReview';
import GetProductDetails from '../../application/usecases/getProductDetails';
import { CreateProductDTO } from '../../domain/dtos/product/createProductDTO';
import { CreateProductReviewDTO } from '../../domain/dtos/product/createProductReviewDTO';
import { ProductDTO } from '../../domain/dtos/product/productDTO';
import { ProductReviewDTO } from '../../domain/dtos/product/productReviewDTO';
import ProductController from '../../application/controllers/productController';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import GetProductShippingEstimates from '../../application/usecases/getProductShippingEstimates';
import { ProductShippingEstimatesDTO } from '../../domain/dtos/product/productShippingEstimatesDTO';
import { CreateCategoryDTO } from '../../domain/dtos/category/createCategoryDTO';
import { CategoryDTO } from '../../domain/dtos/category/categoryDTO';
import AddCategories from '../../application/usecases/addCategories';
import { ProductCategoryAssociationDTO } from '../../domain/dtos/category/productCategoryAssociationDTO';
import AddCategoriesToProducts from '../../application/usecases/addCategoriesToProducts';

@injectable()
export default class ProductControllerImpl implements ProductController {
	private addCategoriesToProductsUseCase: AddCategoriesToProducts;
	private addCategoriesUseCase: AddCategories;
	private addProductReviewUseCase: AddProductReview;
	private addProductsUseCase: AddProducts;
	private getProductDetailsUseCase: GetProductDetails;
	private getProductShippingEstimatesUseCase: GetProductShippingEstimates;

	constructor(
		@inject(TYPES.AddCategoriesToProducts) addCategoriesToProductsUseCase: AddCategoriesToProducts,
		@inject(TYPES.AddCategories) addCategoriesUseCase: AddCategories,
		@inject(TYPES.AddProducts) addProductsUseCase: AddProducts,
		@inject(TYPES.AddProductReview) addProductReviewUseCase: AddProductReview,
		@inject(TYPES.GetProductDetails)
		getProductDetailsUseCase: GetProductDetails,
		@inject(TYPES.GetProductShippingEstimates)
		getProductShippingEstimatesUseCase: GetProductShippingEstimates
	) {
		this.addCategoriesToProductsUseCase = addCategoriesToProductsUseCase;
		this.addCategoriesUseCase = addCategoriesUseCase;
		this.addProductsUseCase = addProductsUseCase;
		this.addProductReviewUseCase = addProductReviewUseCase;
		this.getProductDetailsUseCase = getProductDetailsUseCase;
		this.getProductShippingEstimatesUseCase =
			getProductShippingEstimatesUseCase;
	}

	addCategoriesToProducts = async (
		params: any, body: { productCategoryAssociations: ProductCategoryAssociationDTO[]; }
	): Promise<void> => {
		await this.addCategoriesToProductsUseCase.execute(body.productCategoryAssociations);
	}

	addProducts = async (
		params: any,
		body: { products: CreateProductDTO[] }
	): Promise<ProductDTO[]> => {
		return this.addProductsUseCase.execute(body.products, params.userId);
	};

	addProductReview = async (
		params: any,
		body: CreateProductReviewDTO
	): Promise<ProductReviewDTO> => {
		return this.addProductReviewUseCase.execute(params.id, body, params.userId);
	};

	addCategories = async (params: any, body: { categories: CreateCategoryDTO[] }): Promise<CategoryDTO[]> => {
		return this.addCategoriesUseCase.execute(body.categories, params.userId);
	}

	getProductShippingEstimates = async (
		params: any,
		body: { destinationPostalCode: string }
	): Promise<ProductShippingEstimatesDTO> => {
		const productId = params.id;
		return this.getProductShippingEstimatesUseCase.execute(
			body.destinationPostalCode,
			productId
		);
	};

	//fazer DTOs para os bodys que estão tipados com objetos

	getProductDetails = async (params: any, body: any): Promise<ProductDTO> => {
		return this.getProductDetailsUseCase.execute(params.id);
	};
}
