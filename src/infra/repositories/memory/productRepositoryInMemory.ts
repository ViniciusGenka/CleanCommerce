import EntityNotFoundError from '../../../domain/errors/entityNotFoundError';
import Product from '../../../domain/entities/product';
import ProductRepository from '../../../application/repositories/productRepository';
import ProductReview from '../../../domain/entities/productReview';
import { UpdateProductDTO } from '../../../domain/dtos/product/updateProductDTO';
import { injectable } from 'inversify';
import crypto from 'crypto';

@injectable()
export default class ProductRepositoryInMemory implements ProductRepository {
	public products: Product[] = [];
	public productReviews: ProductReview[] = [];

	async findOneProductById(productId: string): Promise<Product> {
		if (this.products.length === 0)
			throw new EntityNotFoundError('No products found');
		const product = this.products.find((product) =>
			product === null ? false : product.id === productId
		);
		if (!product) throw new EntityNotFoundError('Product not found');
		return product;
	}

	async saveProduct(product: Product): Promise<Product> {
		product.id = crypto.randomUUID();
		this.products.push(product);
		return product;
	}

	async findOneProductByIdAndUpdate(
		productId: string,
		update: UpdateProductDTO
	): Promise<Product> {
		if (this.products.length === 0)
			throw new EntityNotFoundError('No products found');
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].id === productId) {
				this.products[i] = Object.assign(this.products[i], update);
				return this.products[i];
			}
		}
		throw new EntityNotFoundError('Product not found');
	}

	async saveProductReview(
		productReview: ProductReview
	): Promise<ProductReview> {
		this.productReviews.push(productReview);
		return productReview;
	}

	async findProductReviewsByProductId(
		productId: string
	): Promise<ProductReview[]> {
		return this.productReviews.filter(
			(review) => review.productId === productId
		);
	}
}
