import ProductReviewValidator from "../../application/validators/productReviewValidator";
import Joi from 'joi';
import { injectable } from 'inversify';
import CustomError from "../../application/errors/customApplicationError";
import { CreateProductReviewDTO } from "../../domain/dtos/product/createProductReviewDTO";

@injectable()
export class ProductReviewValidatorWithJoi implements ProductReviewValidator {
    validate(reviewData: CreateProductReviewDTO): void {
        this.validateReviewRating(reviewData.rating)
        this.validateReviewText(reviewData.text)
    }

    private validateReviewRating(reviewRating: number): void {
        const schema = Joi.number()
            .min(0)
            .max(5)
        const { error } = schema.validate(reviewRating);
        if (error) throw new CustomError('Rating must be a number between 0 and 5', 400);
    }

    private validateReviewText(reviewText: string): void {
        const schema = Joi.string()
            .min(1)
            .max(500)
        const { error } = schema.validate(reviewText);
        if (error) throw new CustomError('Text must be a string between 1 and 500 characters long', 400);
    }
}