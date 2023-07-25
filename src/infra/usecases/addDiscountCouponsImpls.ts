import AddDiscountCoupons from '../../application/usecases/addDiscountCoupons';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import discountCouponMapper from '../../application/mappers/discountCouponMapper';
import DiscountCouponRepository from '../../application/repositories/discountCouponRepository';
import { DiscountCouponDTO } from '../../domain/dtos/discountCoupon/discountCouponDTO';
import { CreateDiscountCouponDTO } from '../../domain/dtos/discountCoupon/createDiscountCouponDTO';
import { DiscountCoupon } from '../../domain/entities/discountCoupon';

@injectable()
export default class AddDiscountCouponsImpl implements AddDiscountCoupons {
    private userRepository: UserRepository;
    private discountCouponRepository: DiscountCouponRepository;
    constructor(
        @inject(TYPES.DiscountCouponRepository) discountCouponRepository: DiscountCouponRepository,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.discountCouponRepository = discountCouponRepository;
        this.userRepository = userRepository;
    }

    async execute(
        discountCoupons: CreateDiscountCouponDTO[],
        userId: string
    ): Promise<DiscountCouponDTO[]> {
        const userNotFound = !(await this.userRepository.findOneUserById(userId))
        if (userNotFound) throw new EntityNotFoundError("User not found")
        const savedDiscountCoupons: DiscountCouponDTO[] = [];
        for (let i = 0; i < discountCoupons.length; i++) {
            const discountCouponEntity = new DiscountCoupon(
                discountCoupons[i].code,
                discountCoupons[i].discountValue,
                discountCoupons[i].expirationDate,
                discountCoupons[i].title,
                userId
            );
            const saveddiscountCoupon = await this.discountCouponRepository.saveDiscountCoupon(discountCouponEntity);
            savedDiscountCoupons.push(discountCouponMapper.execute(saveddiscountCoupon));
        }
        return savedDiscountCoupons
    }
}

//não deixar cupons com o mesmo código serem criados