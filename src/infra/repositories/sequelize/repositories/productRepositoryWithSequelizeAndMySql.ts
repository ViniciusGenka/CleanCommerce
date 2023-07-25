import EntityNotFoundError from '../../../../domain/errors/entityNotFoundError';
import Product from '../../../../domain/entities/product';
import ProductRepository from '../../../../application/repositories/productRepository';
import ProductReview from '../../../../domain/entities/productReview';
import { UpdateProductDTO } from '../../../../domain/dtos/product/updateProductDTO';
import { injectable } from 'inversify';
import { ProductSchemaEntityMapper } from '../mappers/productSchemaEntityMapper';
import { ProductSchema } from '../schemas/productSchema';
import { ProductReviewSchema } from '../schemas/productReviewSchema';
import { ProductReviewSchemaEntityMapper } from '../mappers/productReviewSchemaEntityMapper';
import { AddressSchema } from '../schemas/addressSchema';
import { CategorySchema } from '../schemas/categorySchema';
import { PromotionSchema } from '../schemas/promotionSchema';
import ProductQuestion from '../../../../domain/entities/productQuestion';
import { ProductQuestionSchemaEntityMapper } from '../mappers/productQuestionSchemaEntityMapper';
import { ProductQuestionSchema } from '../schemas/productQuestionSchema';
import { ProductQuestionAnswerSchemaEntityMapper } from '../mappers/productQuestionAnswerSchemaEntityMapper';
import ProductQuestionAnswer from '../../../../domain/entities/productQuestionAnswer';
import { ProductQuestionAnswerSchema } from '../schemas/productQuestionAnswerSchema';
import { ProductCategoriesSchema } from '../schemas/productCategoriesSchema';

@injectable()
export default class ProductRepositoryWithSequelizeAndMySql
	implements ProductRepository {
	async findProductsByVariationGroupId(
		variationGroupId: string
	): Promise<Product[]> {
		const products = await ProductSchema.findAll({
			where: { variationGroupId: variationGroupId },
			include: [
				{
					model: AddressSchema,
					as: 'stockAddress',
				},
				{
					model: ProductReviewSchema,
					as: 'reviews',
				},
				{
					model: CategorySchema,
					as: 'categories',
					include: [
						{
							model: PromotionSchema,
							as: 'promotions',
						}
					]
				},
				{
					model: PromotionSchema,
					as: 'promotions',
				},
				{
					model: ProductQuestionSchema,
					as: 'questions',
					include: [
						{
							model: ProductQuestionAnswerSchema,
							as: 'answer',
						}
					]
				}
			],
		});
		return ProductSchemaEntityMapper.schemasToEntities(products);
	}

	async findOneProductById(productId: string): Promise<Product | null> {
		const product = await ProductSchema.findByPk(productId, {
			include: [
				{
					model: AddressSchema,
					as: 'stockAddress',
				},
				{
					model: ProductReviewSchema,
					as: 'reviews',
				},
				{
					model: CategorySchema,
					as: 'categories',
					include: [
						{
							model: PromotionSchema,
							as: 'promotions',
						}
					]
				},
				{
					model: PromotionSchema,
					as: 'promotions',
				},
				{
					model: ProductQuestionSchema,
					as: 'questions',
					include: [
						{
							model: ProductQuestionAnswerSchema,
							as: 'answer',
						}
					]
				}
			],
		});
		if (!product) return null;
		return ProductSchemaEntityMapper.schemaToEntity(product);
	}

	async saveProduct(product: Product): Promise<Product> {
		const productSchema = ProductSchemaEntityMapper.entityToSchema(product);
		await productSchema.save();
		for (let i = 0; product.categories.length > i; i++) {
			const productCategorySchema = ProductCategoriesSchema.build({
				categoryId: product.categories[i].id,
				productId: productSchema.id
			});
			await productCategorySchema.save();
		}
		const savedProduct = await ProductSchema.findByPk(productSchema.id, {
			include: [
				{
					model: AddressSchema,
					as: 'stockAddress',
				},
				{
					model: ProductReviewSchema,
					as: 'reviews',
				},
				{
					model: CategorySchema,
					as: 'categories',
					include: [
						{
							model: PromotionSchema,
							as: 'promotions',
						}
					]
				},
				{
					model: PromotionSchema,
					as: 'promotions',
				},
				{
					model: ProductQuestionSchema,
					as: 'questions',
					include: [
						{
							model: ProductQuestionAnswerSchema,
							as: 'answer',
						}
					]
				}
			],
		});
		return ProductSchemaEntityMapper.schemaToEntity(savedProduct);
	}

	async findOneProductByIdAndUpdate(
		productId: string,
		update: UpdateProductDTO
	): Promise<Product> {
		const updateSucceeded = await ProductSchema.update(update, {
			where: { id: productId },
		});
		if (!updateSucceeded) throw new EntityNotFoundError('Product not found');
		const updatedProduct = await ProductSchema.findByPk(productId, {
			include: [
				{
					model: AddressSchema,
					as: 'stockAddress',
				},
				{
					model: ProductReviewSchema,
					as: 'reviews',
				},
				{
					model: CategorySchema,
					as: 'categories',
					include: [
						{
							model: PromotionSchema,
							as: 'promotions',
						}
					]
				},
				{
					model: PromotionSchema,
					as: 'promotions',
				},
				{
					model: ProductQuestionSchema,
					as: 'questions',
					include: [
						{
							model: ProductQuestionAnswerSchema,
							as: 'answer',
						}
					]
				}
			],
		});
		return ProductSchemaEntityMapper.schemaToEntity(updatedProduct);
	}

	async saveProductReview(
		productReview: ProductReview
	): Promise<ProductReview> {
		const productReviewSchema =
			ProductReviewSchemaEntityMapper.entityToSchema(productReview);
		const savedProductReview = await productReviewSchema.save();
		return ProductReviewSchemaEntityMapper.schemaToEntity(savedProductReview);
	}

	async findProductReviewsByProductId(
		productId: string
	): Promise<ProductReview[]> {
		const productReviewSchemas = await ProductReviewSchema.findAll({
			where: { productId: productId },
		});
		return ProductReviewSchemaEntityMapper.schemasToEntities(
			productReviewSchemas
		);
	}

	async saveProductQuestion(
		productQuestion: ProductQuestion
	): Promise<ProductQuestion> {
		const productQuestionSchema =
			ProductQuestionSchemaEntityMapper.entityToSchema(productQuestion);
		const savedProductQuestion = await productQuestionSchema.save();
		return ProductQuestionSchemaEntityMapper.schemaToEntity(savedProductQuestion);
	}

	async findAllProductQuestionsByProductId(productId: string): Promise<ProductQuestion[]> {
		const productQuestionSchemas = await ProductQuestionSchema.findAll({
			where: { productId: productId },
			include: [
				{
					model: ProductQuestionAnswerSchema,
					as: 'answer',
				}
			]
		});
		return ProductQuestionSchemaEntityMapper.schemasToEntities(
			productQuestionSchemas
		);
	}

	async saveProductQuestionAnswer(productQuestionAnswer: ProductQuestionAnswer): Promise<ProductQuestionAnswer> {
		const productQuestionAnswerSchema =
			ProductQuestionAnswerSchemaEntityMapper.entityToSchema(productQuestionAnswer);
		const savedProductQuestionAnswer = await productQuestionAnswerSchema.save();
		return ProductQuestionAnswerSchemaEntityMapper.schemaToEntity(savedProductQuestionAnswer);
	}

	async findOneProductQuestionById(productQuestionId: string): Promise<ProductQuestion> {
		const productQuestionSchema = await ProductQuestionSchema.findByPk(productQuestionId, {
			include: [
				{
					model: ProductQuestionAnswerSchema,
					as: 'answer',
				}
			]
		});
		return ProductQuestionSchemaEntityMapper.schemaToEntity(
			productQuestionSchema
		);
	}
}
