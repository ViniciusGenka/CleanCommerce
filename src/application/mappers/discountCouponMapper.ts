import { DiscountCoupon } from '../../domain/entities/discountCoupon';
import { DiscountCouponDTO } from '../../domain/dtos/discountCoupon/discountCouponDTO';

export default class DiscountCouponMapper {
    static execute(discountCouponEntity: DiscountCoupon): DiscountCouponDTO {
        return {
            id: discountCouponEntity.id,
            code: discountCouponEntity.code,
            discountValue: discountCouponEntity.discountValue,
            expirationDate: discountCouponEntity.expirationDate,
            title: discountCouponEntity.title,
            userId: discountCouponEntity.userId,
            createdAt: discountCouponEntity.createdAt,
        };
    }
}
