import { CreateProductQuestionDTO } from '../../domain/dtos/product/createProductQuestionDTO';
import { ProductQuestionDTO } from '../../domain/dtos/product/productQuestionDTO';

export default interface AddProductQuestion {
    execute(
        productId: string,
        questionData: CreateProductQuestionDTO,
        userId: string
    ): Promise<ProductQuestionDTO>;
}
