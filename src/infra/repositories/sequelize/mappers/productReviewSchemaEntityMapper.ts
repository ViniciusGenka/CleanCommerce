import ProductReview from '../../../../domain/entities/productReview';
import { ProductReviewSchema } from '../schemas/productReviewSchema';

export class ProductReviewSchemaEntityMapper {
	static schemaToEntity(
		productReviewSchema: ProductReviewSchema
	): ProductReview {
		return new ProductReview(
			productReviewSchema.productId,
			productReviewSchema.rating,
			productReviewSchema.text,
			productReviewSchema.userId,
			productReviewSchema.id
		);
	}

	static entityToSchema(
		productReviewEntity: ProductReview
	): ProductReviewSchema {
		return ProductReviewSchema.build({
			productId: productReviewEntity.productId,
			rating: productReviewEntity.rating,
			text: productReviewEntity.text,
			userId: productReviewEntity.userId,
		});
	}

	static schemasToEntities(
		productReviewSchemas: ProductReviewSchema[]
	): ProductReview[] {
		let productReviewEntities: ProductReview[] = [];
		for (let i = 0; i < productReviewSchemas.length; i++) {
			const productReviewEntity = new ProductReview(
				productReviewSchemas[i].productId,
				productReviewSchemas[i].rating,
				productReviewSchemas[i].text,
				productReviewSchemas[i].userId,
				productReviewSchemas[i].id
			);
			productReviewEntities.push(productReviewEntity);
		}
		return productReviewEntities;
	}
}
