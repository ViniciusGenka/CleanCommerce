import { Promotion } from '../../domain/entities/promotion';
import { PromotionDTO } from '../../domain/dtos/promotion/promotionDTO';

export default class PromotionMapper {
    static execute(promotionEntity: Promotion): PromotionDTO {
        return {
            id: promotionEntity.id,
            name: promotionEntity.name,
            minimumPurchaseQuantity: promotionEntity.minimumPurchaseQuantity,
            discountValue: promotionEntity.discountValue,
            expirationDate: promotionEntity.expirationDate,
            userId: promotionEntity.userId,
            createdAt: promotionEntity.createdAt,
        };
    }
}
