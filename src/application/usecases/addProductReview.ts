import { ProductReviewDTO } from '../../domain/dtos/product/productReviewDTO';
import { CreateProductReviewDTO } from '../../domain/dtos/product/createProductReviewDTO';

export default interface AddProductReview {
	execute(
		productId: string,
		reviewData: CreateProductReviewDTO,
		userId: string
	): Promise<ProductReviewDTO>;
}
