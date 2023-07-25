import { PromotionDTO } from "../promotion/promotionDTO";

export type CategoryDTO = {
    id: string;
    name: string;
    promotions?: PromotionDTO[];
};
