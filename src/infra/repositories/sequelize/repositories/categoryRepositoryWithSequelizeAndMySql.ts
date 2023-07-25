
import { injectable } from 'inversify';
import CategoryRepository from '../../../../application/repositories/categoryRepository';
import Category from '../../../../domain/entities/category';
import { CategorySchema } from '../schemas/categorySchema';
import { CategorySchemaEntityMapper } from '../mappers/categorySchemaEntityMapper';
import { ProductCategoriesSchema } from '../schemas/productCategoriesSchema';
import { ProductCategoryAssociationDTO } from '../../../../domain/dtos/category/productCategoryAssociationDTO';
import { PromotionSchema } from '../schemas/promotionSchema';

@injectable()
export default class CategoryRepositoryWithSequelizeAndMySql
    implements CategoryRepository {
    async saveCategory(category: Category): Promise<Category> {
        const categorySchema = CategorySchema.build({
            name: category.name
        });
        const savedCategory = await categorySchema.save();
        const fullCategory = await CategorySchema.findByPk(savedCategory.id, {
            include: [
                {
                    model: PromotionSchema,
                    as: "promotions"
                }
            ]
        })
        return CategorySchemaEntityMapper.schemaToEntity(fullCategory);
    }

    async addCategoryToProduct(productCategoryAssociation: ProductCategoryAssociationDTO): Promise<void> {
        const productCategorySchema = ProductCategoriesSchema.build({
            categoryId: productCategoryAssociation.categoryId,
            productId: productCategoryAssociation.productId
        });
        await productCategorySchema.save();
    }

    async findCategoryById(categoryId: string): Promise<Category> {
        const categorySchema = await CategorySchema.findByPk(categoryId);
        if (!categorySchema) return null;
        return CategorySchemaEntityMapper.schemaToEntity(categorySchema);
    }

    async findCategoriesById(categoryIds: string[]): Promise<Category[]> {
        const categorySchemas = await CategorySchema.findAll({
            where: {
                id: categoryIds
            },
            include: [
                {
                    model: PromotionSchema,
                    as: "promotions"
                }
            ]

        });
        return CategorySchemaEntityMapper.schemasToEntities(categorySchemas);
    }
}
