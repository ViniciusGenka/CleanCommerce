import { ProductQuestionAnswerDTO } from "../../domain/dtos/product/productQuestionAnswerDTO";
import ProductQuestionAnswer from "../../domain/entities/productQuestionAnswer";


export default class ProductQuestionAnswerMapper {
    static execute(productQuestionAnswerEntity: ProductQuestionAnswer): ProductQuestionAnswerDTO {
        return {
            id: productQuestionAnswerEntity.id,
            userId: productQuestionAnswerEntity.userId,
            questionId: productQuestionAnswerEntity.questionId,
            text: productQuestionAnswerEntity.text,
        };
    }
}
