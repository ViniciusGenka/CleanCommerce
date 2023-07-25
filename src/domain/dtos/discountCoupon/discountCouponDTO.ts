export type DiscountCouponDTO = {
    id: string;
    code: string;
    discountValue: number;
    expirationDate: Date;
    title: string;
    userId: string;
    createdAt: Date;
};