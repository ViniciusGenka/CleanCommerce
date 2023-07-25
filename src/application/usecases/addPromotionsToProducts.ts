import { ProductPromotionAssociationDTO } from "../../domain/dtos/promotion/productPromotionAssociationDTO";

export default interface AddPromotionsToProducts {
    execute(productPromotionAssociations: ProductPromotionAssociationDTO[]): Promise<void>;
}
