import { CreateProductReviewDTO } from "../../domain/dtos/product/createProductReviewDTO";

export default interface ProductReviewValidator {
    validate(reviewData: CreateProductReviewDTO): void;
}