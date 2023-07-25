import { DiscountCoupon } from "../../domain/entities/discountCoupon";

export default interface DiscountCouponRepository {
    saveDiscountCoupon(discountCoupon: DiscountCoupon): Promise<DiscountCoupon>;
    addDiscountCouponToAnOrderByDiscountCode(discountCouponCode: string, orderId: string): Promise<void>;
    findOneDiscountCouponByDiscountCode(discountCode: string): Promise<DiscountCoupon>;
}
