import { Promotion } from "../../../../domain/entities/promotion";
import { PromotionSchema } from "../schemas/promotionSchema";

export default class PromotionSchemaEntityMapper {
    static schemaToEntity(promotionSchema: PromotionSchema): Promotion {
        return new Promotion(
            promotionSchema.discountValue,
            promotionSchema.expirationDate,
            promotionSchema.name,
            promotionSchema.userId,
            promotionSchema.id,
            promotionSchema.minimumPurchaseQuantity
        );
    }

    static entityToSchema(promotionEntity: Promotion): PromotionSchema {
        return PromotionSchema.build({
            id: promotionEntity.id,
            name: promotionEntity.name,
            discountValue: promotionEntity.discountValue,
            expirationDate: promotionEntity.expirationDate,
            createdAt: promotionEntity.createdAt
        });
    }

    static schemasToEntities(promotionSchema: PromotionSchema[]): Promotion[] {
        let promotionEntities: Promotion[] = [];
        for (let i = 0; i < promotionSchema.length; i++) {
            const promotionEntity = new Promotion(
                promotionSchema[i].discountValue,
                promotionSchema[i].expirationDate,
                promotionSchema[i].name,
                promotionSchema[i].userId,
                promotionSchema[i].id,
                promotionSchema[i].minimumPurchaseQuantity
            );
            promotionEntities.push(promotionEntity);
        }
        return promotionEntities
    }
}