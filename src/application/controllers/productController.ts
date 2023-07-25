import { CategoryDTO } from '../../domain/dtos/category/categoryDTO';
import { CreateCategoryDTO } from '../../domain/dtos/category/createCategoryDTO';
import { ProductCategoryAssociationDTO } from '../../domain/dtos/category/productCategoryAssociationDTO';
import { CreateProductDTO } from '../../domain/dtos/product/createProductDTO';
import { CreateProductReviewDTO } from '../../domain/dtos/product/createProductReviewDTO';
import { ProductDTO } from '../../domain/dtos/product/productDTO';
import { ProductReviewDTO } from '../../domain/dtos/product/productReviewDTO';
import { ProductShippingEstimatesDTO } from '../../domain/dtos/product/productShippingEstimatesDTO';

export default interface ProductController {
	addProducts(
		params: any,
		body: { products: CreateProductDTO[] }
	): Promise<ProductDTO[]>;

	addProductReview(
		params: any,
		body: CreateProductReviewDTO
	): Promise<ProductReviewDTO>;

	addCategories(params: any, body: { categories: CreateCategoryDTO[] }): Promise<CategoryDTO[]>;

	addCategoriesToProducts(params: any, body: { productCategoryAssociations: ProductCategoryAssociationDTO[] }): Promise<void>;

	getProductShippingEstimates(
		params: any,
		body: { destinationPostalCode: string }
	): Promise<ProductShippingEstimatesDTO>;

	getProductDetails(params: any, body: any): Promise<ProductDTO>;
}
