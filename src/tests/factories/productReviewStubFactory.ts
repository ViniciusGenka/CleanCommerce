import ProductReview from "../../domain/entities/productReview";

export class ProductReviewStubFactory {
    static create(): jest.Mocked<ProductReview> {
        const productReviewObject: jest.Mocked<ProductReview> = {
            id: "any_id",
            productId: "any_product_id",
            rating: 5,
            text: "any_id",
            userId: "any_user_id",
        }
        return productReviewObject
    }
}