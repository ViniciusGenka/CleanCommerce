import { injectable } from "inversify";
import { Promotion } from "../../../../domain/entities/promotion";
import PromotionRepository from "../../../../application/repositories/promotionRepository";
import PromotionSchemaEntityMapper from "../mappers/promotionSchemaEntityMapper";
import { ProductPromotionsSchema } from "../schemas/productPromotionsSchema";
import { PromotionSchema } from "../schemas/promotionSchema";
import { CategoryPromotionsSchema } from "../schemas/categoryPromotionsSchema";
import { CategoryPromotionAssociationDTO } from "../../../../domain/dtos/promotion/categoryPromotionAssociationDTO";
import { ProductPromotionAssociationDTO } from "../../../../domain/dtos/promotion/productPromotionAssociationDTO";

@injectable()
export default class PromotionRepositoryWithSequelizeAndMySql implements PromotionRepository {
    async savePromotion(promotion: Promotion): Promise<Promotion> {
        const promotionSchema = PromotionSchemaEntityMapper.entityToSchema(promotion);
        const savedPromotion = await promotionSchema.save();
        return PromotionSchemaEntityMapper.schemaToEntity(savedPromotion);
    }

    async addPromotionToProduct(productPromotionAssociations: ProductPromotionAssociationDTO): Promise<void> {
        const productPromotionSchema = ProductPromotionsSchema.build({
            productId: productPromotionAssociations.productId,
            promotionId: productPromotionAssociations.promotionId
        })
        await productPromotionSchema.save();
    }

    async addPromotionToCategory(categoryPromotionAssociation: CategoryPromotionAssociationDTO): Promise<void> {
        const categoryPromotionSchema = CategoryPromotionsSchema.build({
            promotionId: categoryPromotionAssociation.promotionId,
            categoryId: categoryPromotionAssociation.categoryId
        })
        await categoryPromotionSchema.save();
    }

    async findOnePromotionById(promotionId: string): Promise<Promotion> {
        const promotionSchema = await PromotionSchema.findByPk(promotionId);
        if (!promotionSchema) return null;
        return PromotionSchemaEntityMapper.schemaToEntity(promotionSchema);
    }

    async findPromotionsByProductId(productId: string): Promise<Promotion[]> {
        const productPromotionSchemas = await ProductPromotionsSchema.findAll({ where: { productId: productId } });
        const promotionIdsList = productPromotionSchemas.map(productPromotionSchema => productPromotionSchema.promotionId);
        const promotionSchemas = await PromotionSchema.findAll({
            where: {
                id: promotionIdsList
            }
        });
        return PromotionSchemaEntityMapper.schemasToEntities(promotionSchemas);
    }

    async findPromotionsByCategoryId(categoryId: string): Promise<Promotion[]> {
        const categoryPromotionSchemas = await CategoryPromotionsSchema.findAll({ where: { categoryId: categoryId } });
        const promotionIdsList = categoryPromotionSchemas.map(categoryPromotionSchema => categoryPromotionSchema.promotionId);
        const promotionSchemas = await PromotionSchema.findAll({
            where: {
                id: promotionIdsList
            }
        });
        return PromotionSchemaEntityMapper.schemasToEntities(promotionSchemas);
    }
}