import ProductRepository from '../../application/repositories/productRepository';
import ProductReviewMapper from '../../application/mappers/productReviewMapper';
import { CreateProductReviewDTO } from '../../domain/dtos/product/createProductReviewDTO';
import { ProductReviewDTO } from '../../domain/dtos/product/productReviewDTO';
import AddProductReview from '../../application/usecases/addProductReview';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import ProductReview from '../../domain/entities/productReview';
import ProductReviewValidator from '../../application/validators/productReviewValidator';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class AddProductReviewImpl implements AddProductReview {
	private productRepository: ProductRepository;
	private userRepository: UserRepository;
	private productReviewValidator: ProductReviewValidator;
	constructor(
		@inject(TYPES.ProductRepository) productRepository: ProductRepository,
		@inject(TYPES.ProductReviewValidator) productReviewValidator: ProductReviewValidator,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.productRepository = productRepository;
		this.productReviewValidator = productReviewValidator
		this.userRepository = userRepository;
	}

	async execute(
		productId: string,
		reviewData: CreateProductReviewDTO,
		userId: string
	): Promise<ProductReviewDTO> {
		this.productReviewValidator.validate(reviewData);
		const productReviewEntity = new ProductReview(
			productId,
			reviewData.rating,
			reviewData.text,
			userId
		);
		const productNotFound = !(await this.productRepository.findOneProductById(productId))
		if (productNotFound) throw new EntityNotFoundError('Product not found')
		const userNotFound = !(await this.userRepository.findOneUserById(userId))
		if (userNotFound) throw new EntityNotFoundError("User not found")
		const savedProductReview = await this.productRepository.saveProductReview(
			productReviewEntity
		);
		return ProductReviewMapper.execute(savedProductReview);
	}
}
