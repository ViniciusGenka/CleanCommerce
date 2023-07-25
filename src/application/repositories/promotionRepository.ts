import { CategoryPromotionAssociationDTO } from "../../domain/dtos/promotion/categoryPromotionAssociationDTO";
import { ProductPromotionAssociationDTO } from "../../domain/dtos/promotion/productPromotionAssociationDTO";
import { Promotion } from "../../domain/entities/promotion";

export default interface PromotionRepository {
    savePromotion(promotion: Promotion): Promise<Promotion>;
    addPromotionToProduct(productPromotionAssociation: ProductPromotionAssociationDTO): Promise<void>;
    addPromotionToCategory(categoryPromotionAssociation: CategoryPromotionAssociationDTO): Promise<void>;
    findOnePromotionById(promotionId: string): Promise<Promotion>;
    findPromotionsByProductId(productId: string): Promise<Promotion[]>;
    findPromotionsByCategoryId(categoryId: string): Promise<Promotion[]>;
}
