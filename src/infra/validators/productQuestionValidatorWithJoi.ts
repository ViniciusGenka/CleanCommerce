import Joi from 'joi';
import { injectable } from 'inversify';
import CustomError from "../../application/errors/customApplicationError";
import { CreateProductQuestionDTO } from "../../domain/dtos/product/createProductQuestionDTO";
import { ProductQuestionValidator } from '../../application/validators/productQuestionValidator';

@injectable()
export class ProductQuestionValidatorWithJoi implements ProductQuestionValidator {
    validate(questionData: CreateProductQuestionDTO): void {
        const schema = Joi.string()
            .min(1)
            .max(500)
        const { error } = schema.validate(questionData);
        if (error) throw new CustomError('Text must be a string between 1 and 500 characters long', 400);
    }
}