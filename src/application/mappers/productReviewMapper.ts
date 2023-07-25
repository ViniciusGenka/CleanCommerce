import ProductReview from '../../domain/entities/productReview';
import { ProductReviewDTO } from '../../domain/dtos/product/productReviewDTO';

export default class ProductReviewMapper {
	static execute(productReviewEntity: ProductReview): ProductReviewDTO {
		return {
			id: productReviewEntity.id,
			userId: productReviewEntity.userId,
			productId: productReviewEntity.productId,
			rating: productReviewEntity.rating,
			text: productReviewEntity.text,
		};
	}
}
