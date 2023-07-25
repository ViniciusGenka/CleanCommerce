import { CreateProductQuestionAnswerDTO } from '../../domain/dtos/product/createProductQuestionAnswerDTO';
import { ProductQuestionAnswerDTO } from '../../domain/dtos/product/productQuestionAnswerDTO';

export default interface AddProductQuestionAnswer {
    execute(
        questionId: string,
        questionAnswerData: CreateProductQuestionAnswerDTO,
        userId: string
    ): Promise<ProductQuestionAnswerDTO>;
}
