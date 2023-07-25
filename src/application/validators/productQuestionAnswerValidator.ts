import { CreateProductQuestionAnswerDTO } from "../../domain/dtos/product/createProductQuestionAnswerDTO";

export interface ProductQuestionAnswerValidator {
    validate(questionData: CreateProductQuestionAnswerDTO): void;
}