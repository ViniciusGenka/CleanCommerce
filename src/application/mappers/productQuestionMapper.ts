import { ProductQuestionDTO } from "../../domain/dtos/product/productQuestionDTO";
import ProductQuestion from "../../domain/entities/productQuestion";

export default class ProductQuestionMapper {
    static execute(productQuestionEntity: ProductQuestion): ProductQuestionDTO {
        return {
            id: productQuestionEntity.id,
            userId: productQuestionEntity.userId,
            productId: productQuestionEntity.productId,
            text: productQuestionEntity.text,
        };
    }
}
