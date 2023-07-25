import { CreateProductQuestionDTO } from "../../domain/dtos/product/createProductQuestionDTO";

export interface ProductQuestionValidator {
    validate(questionData: CreateProductQuestionDTO): void;
}