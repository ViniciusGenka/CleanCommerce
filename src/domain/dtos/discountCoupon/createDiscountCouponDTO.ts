export type CreateDiscountCouponDTO = {
    code: string;
    title: string;
    discountValue: number;
    expirationDate: Date;
};