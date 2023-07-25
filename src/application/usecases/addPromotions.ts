import { CreatePromotionDTO } from '../../domain/dtos/promotion/createPromotionDTO';
import { PromotionDTO } from '../../domain/dtos/promotion/promotionDTO';

export default interface AddPromotions {
    execute(
        promotions: CreatePromotionDTO[],
        userId: string
    ): Promise<PromotionDTO[]>;
}
