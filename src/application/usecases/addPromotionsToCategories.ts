import { CategoryPromotionAssociationDTO } from "../../domain/dtos/promotion/categoryPromotionAssociationDTO";

export default interface AddPromotionsToCategories {
    execute(categoryPromotionAssociations: CategoryPromotionAssociationDTO[]): Promise<void>;
}
