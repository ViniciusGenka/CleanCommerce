export type PromotionDTO = {
    id: string;
    name: string;
    minimumPurchaseQuantity: number;
    discountValue: number;
    expirationDate: Date;
    userId: string;
    createdAt: Date;
};