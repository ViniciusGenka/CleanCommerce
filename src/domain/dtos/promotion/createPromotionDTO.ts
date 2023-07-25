export type CreatePromotionDTO = {
    name: string;
    discountValue: number;
    minimumPurchaseQuantity?: number;
    expirationDate: Date;
};