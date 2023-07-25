import ProductQuestion from '../../../../domain/entities/productQuestion';
import { ProductQuestionSchema } from '../schemas/productQuestionSchema';

export class ProductQuestionSchemaEntityMapper {
    static schemaToEntity(
        productQuestionSchema: ProductQuestionSchema
    ): ProductQuestion {
        return new ProductQuestion(
            productQuestionSchema.productId,
            productQuestionSchema.text,
            productQuestionSchema.userId,
            productQuestionSchema.id,
            productQuestionSchema?.answer
        );
    }

    static entityToSchema(
        productQuestionEntity: ProductQuestion
    ): ProductQuestionSchema {
        return ProductQuestionSchema.build({
            productId: productQuestionEntity.productId,
            text: productQuestionEntity.text,
            userId: productQuestionEntity.userId,
        });
    }

    static schemasToEntities(
        productQuestionSchemas: ProductQuestionSchema[]
    ): ProductQuestion[] {
        let productQuestionEntities: ProductQuestion[] = [];
        for (let i = 0; i < productQuestionSchemas.length; i++) {
            const productQuestionEntity = new ProductQuestion(
                productQuestionSchemas[i].productId,
                productQuestionSchemas[i].text,
                productQuestionSchemas[i].userId,
                productQuestionSchemas[i].id,
                productQuestionSchemas[i]?.answer
            );
            productQuestionEntities.push(productQuestionEntity);
        }
        return productQuestionEntities;
    }
}
