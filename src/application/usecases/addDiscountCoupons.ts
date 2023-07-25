import { CreateDiscountCouponDTO } from '../../domain/dtos/discountCoupon/createDiscountCouponDTO';
import { DiscountCouponDTO } from '../../domain/dtos/discountCoupon/discountCouponDTO';

export default interface AddDiscountCoupons {
    execute(
        discountCoupons: CreateDiscountCouponDTO[],
        userId: string
    ): Promise<DiscountCouponDTO[]>;
}
