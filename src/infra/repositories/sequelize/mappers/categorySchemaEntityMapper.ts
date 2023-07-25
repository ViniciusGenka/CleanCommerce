import Category from '../../../../domain/entities/category';
import { CategorySchema } from '../schemas/categorySchema';
import PromotionSchemaEntityMapper from './promotionSchemaEntityMapper';

export class CategorySchemaEntityMapper {
    static schemaToEntity(categorySchema: CategorySchema): Category {
        return new Category(
            categorySchema.name,
            categorySchema.id,
            PromotionSchemaEntityMapper.schemasToEntities(categorySchema.promotions)
        )
    }

    static schemasToEntities(categorySchemas: CategorySchema[]): Category[] {
        const categoryEntities: Category[] = [];
        for (let i = 0; i < categorySchemas.length; i++) {
            const categoryEntity = new Category(
                categorySchemas[i].name,
                categorySchemas[i].id,
                PromotionSchemaEntityMapper.schemasToEntities(categorySchemas[i].promotions)
            )
            categoryEntities.push(categoryEntity);
        }
        return categoryEntities;
    }
}