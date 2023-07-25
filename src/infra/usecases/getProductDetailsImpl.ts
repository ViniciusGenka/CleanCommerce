import ProductRepository from '../../application/repositories/productRepository';
import GetProductDetails from '../../application/usecases/getProductDetails';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import { ProductDTO } from '../../domain/dtos/product/productDTO';
import ProductMapper from '../../application/mappers/productMapper';
import Product from '../../domain/entities/product';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class GetProductDetailsImpl implements GetProductDetails {
	private productRepository: ProductRepository;
	constructor(
		@inject(TYPES.ProductRepository) productRepository: ProductRepository
	) {
		this.productRepository = productRepository;
	}

	async execute(productId: string): Promise<ProductDTO> {
		const productEntity = await this.productRepository.findOneProductById(
			productId
		);
		if (!productEntity) throw new EntityNotFoundError("Product not found")
		const reviewEntities =
			await this.productRepository.findProductReviewsByProductId(productId);
		productEntity.reviews = reviewEntities;
		let variationProductEntities: Product[] = []
		if (productEntity.variation?.groupId) {
			variationProductEntities =
				(await this.productRepository.findProductsByVariationGroupId(
					productEntity.variation?.groupId
				)).filter(
					(variationProductEntity: Product) =>
						variationProductEntity.id !== productEntity.id
				);
		}
		return ProductMapper.execute(productEntity, variationProductEntities);
	}
}
