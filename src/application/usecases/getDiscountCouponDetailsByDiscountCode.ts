import { DiscountCouponDTO } from '../../domain/dtos/discountCoupon/discountCouponDTO';

export default interface GetDiscountCouponDetailsByDiscountCode {
    execute(discountCode: string): Promise<DiscountCouponDTO>;
}
