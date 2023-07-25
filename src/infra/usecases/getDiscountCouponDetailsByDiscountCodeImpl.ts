import { inject, injectable } from 'inversify';
import DiscountCouponRepository from '../../application/repositories/discountCouponRepository';
import GetDiscountCouponDetailsByDiscountCode from '../../application/usecases/getDiscountCouponDetailsByDiscountCode';
import { DiscountCouponDTO } from '../../domain/dtos/discountCoupon/discountCouponDTO';
import { TYPES } from '../configs/inversify.types';
import DiscountCouponMapper from '../../application/mappers/discountCouponMapper';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export class GetDiscountCouponDetailsByDiscountCodeImpl implements GetDiscountCouponDetailsByDiscountCode {
    private discountCouponRepository: DiscountCouponRepository;

    constructor(@inject(TYPES.DiscountCouponRepository) discountCouponRepository: DiscountCouponRepository) {
        this.discountCouponRepository = discountCouponRepository;
    }

    async execute(discountCode: string): Promise<DiscountCouponDTO> {
        const discountCouponEntity = await this.discountCouponRepository.findOneDiscountCouponByDiscountCode(discountCode);
        if (!discountCouponEntity) throw new EntityNotFoundError("Discount coupon not found")
        return DiscountCouponMapper.execute(discountCouponEntity);
    }
}
