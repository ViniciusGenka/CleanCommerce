import Product from '../../../../domain/entities/product';
import { ProductSchema } from '../schemas/productSchema';
import { AddressSchemaEntityMapper } from './addressSchemaEntityMapper';
import { CategorySchemaEntityMapper } from './categorySchemaEntityMapper';
import { ProductQuestionSchemaEntityMapper } from './productQuestionSchemaEntityMapper';
import { ProductReviewSchemaEntityMapper } from './productReviewSchemaEntityMapper';
import PromotionSchemaEntityMapper from './promotionSchemaEntityMapper';

export class ProductSchemaEntityMapper {
	static schemaToEntity(productSchema: ProductSchema): Product {
		const productStockAddressEntity = AddressSchemaEntityMapper.schemaToEntity(
			productSchema.stockAddress
		);
		const productReviewEntities =
			ProductReviewSchemaEntityMapper.schemasToEntities(productSchema.reviews);
		const productVariationDetails = {
			label: productSchema.variationLabel,
			value: productSchema.variationValue,
			groupId: productSchema.variationGroupId,
		};
		const productPromotionEntities = PromotionSchemaEntityMapper.schemasToEntities(productSchema.promotions);
		const productQuestionEntities = ProductQuestionSchemaEntityMapper.schemasToEntities(productSchema.questions);
		return new Product(
			CategorySchemaEntityMapper.schemasToEntities(productSchema.categories),
			productSchema.description,
			productSchema.price,
			productStockAddressEntity,
			productSchema.stockQuantity,
			productSchema.title,
			productSchema.userId,
			productVariationDetails,
			productSchema.id,
			productPromotionEntities,
			productQuestionEntities,
			productReviewEntities,
		);
	}

	static schemasToEntities(productSchemas: ProductSchema[]): Product[] {
		const productEntities: Product[] = [];
		productSchemas.forEach((productSchema) => {
			const categoryEntities = CategorySchemaEntityMapper.schemasToEntities(productSchema.categories);
			const productStockAddressEntity =
				AddressSchemaEntityMapper.schemaToEntity(productSchema.stockAddress);
			const productReviewEntities =
				ProductReviewSchemaEntityMapper.schemasToEntities(
					productSchema.reviews
				);
			const productVariationDetails = {
				label: productSchema.variationLabel,
				value: productSchema.variationValue,
				groupId: productSchema.variationGroupId,
			};
			const productPromotionEntities = PromotionSchemaEntityMapper.schemasToEntities(productSchema.promotions);
			const productQuestionEntities = ProductQuestionSchemaEntityMapper.schemasToEntities(productSchema.questions);
			productEntities.push(
				new Product(
					categoryEntities,
					productSchema.description,
					productSchema.price,
					productStockAddressEntity,
					productSchema.stockQuantity,
					productSchema.title,
					productSchema.userId,
					productVariationDetails,
					productSchema.id,
					productPromotionEntities,
					productQuestionEntities,
					productReviewEntities,
				)
			);
		});
		return productEntities;
	}

	static entityToSchema(productEntity: Product): ProductSchema {
		return ProductSchema.build({
			description: productEntity.description,
			price: productEntity.price,
			stockAddressId: productEntity.stockAddress.id,
			stockQuantity: productEntity.stockQuantity,
			title: productEntity.title,
			userId: productEntity.userId,
			variationLabel: productEntity.variation.label,
			variationValue: productEntity.variation.value,
			variationGroupId: productEntity.variation.groupId,
		});
	}
}
