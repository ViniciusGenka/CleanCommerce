import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import PromotionRepository from '../../application/repositories/promotionRepository';
import AddPromotions from '../../application/usecases/addPromotions';
import { CreatePromotionDTO } from '../../domain/dtos/promotion/createPromotionDTO';
import { PromotionDTO } from '../../domain/dtos/promotion/promotionDTO';
import PromotionMapper from '../../application/mappers/promotionMapper';
import { Promotion } from '../../domain/entities/promotion';

@injectable()
export default class AddPromotionsImpl implements AddPromotions {
    private promotionRepository: PromotionRepository;
    private userRepository: UserRepository;

    constructor(
        @inject(TYPES.PromotionRepository) promotionRepository: PromotionRepository,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.promotionRepository = promotionRepository;
        this.userRepository = userRepository;
    }

    async execute(
        promotions: CreatePromotionDTO[],
        userId: string
    ): Promise<PromotionDTO[]> {
        const userNotFound = !(await this.userRepository.findOneUserById(userId))
        if (userNotFound) throw new EntityNotFoundError("User not found")
        const savedPromotions: PromotionDTO[] = [];
        for (let i = 0; i < promotions.length; i++) {
            const promotionEntity = new Promotion(
                promotions[i].discountValue,
                promotions[i].expirationDate,
                promotions[i].name,
                userId
            );
            const savedPromotion = await this.promotionRepository.savePromotion(promotionEntity);
            savedPromotions.push(PromotionMapper.execute(savedPromotion));
        }
        return savedPromotions;
    }
}