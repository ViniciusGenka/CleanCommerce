import ProductQuestionAnswer from '../../../../domain/entities/productQuestionAnswer';
import { ProductQuestionAnswerSchema } from '../schemas/productQuestionAnswerSchema';

export class ProductQuestionAnswerSchemaEntityMapper {
    static schemaToEntity(
        productQuestionAnswerSchema: ProductQuestionAnswerSchema
    ): ProductQuestionAnswer {
        return new ProductQuestionAnswer(
            productQuestionAnswerSchema.questionId,
            productQuestionAnswerSchema.text,
            productQuestionAnswerSchema.userId,
            productQuestionAnswerSchema.id
        );
    }

    static entityToSchema(
        productQuestionAnswerEntity: ProductQuestionAnswer
    ): ProductQuestionAnswerSchema {
        return ProductQuestionAnswerSchema.build({
            questionId: productQuestionAnswerEntity.questionId,
            text: productQuestionAnswerEntity.text,
            userId: productQuestionAnswerEntity.userId,
        });
    }

    static schemasToEntities(
        productQuestionAnswerSchemas: ProductQuestionAnswerSchema[]
    ): ProductQuestionAnswer[] {
        let productQuestionAnswerEntities: ProductQuestionAnswer[] = [];
        for (let i = 0; i < productQuestionAnswerSchemas.length; i++) {
            const productQuestionAnswerEntity = new ProductQuestionAnswer(
                productQuestionAnswerSchemas[i].questionId,
                productQuestionAnswerSchemas[i].text,
                productQuestionAnswerSchemas[i].userId,
                productQuestionAnswerSchemas[i].id
            );
            productQuestionAnswerEntities.push(productQuestionAnswerEntity);
        }
        return productQuestionAnswerEntities;
    }
}
