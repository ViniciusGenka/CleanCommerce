import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import CategoryRepository from '../../application/repositories/categoryRepository';
import PromotionRepository from '../../application/repositories/promotionRepository';
import AddPromotionsToCategories from '../../application/usecases/addPromotionsToCategories';
import { CategoryPromotionAssociationDTO } from '../../domain/dtos/promotion/categoryPromotionAssociationDTO';

@injectable()
export default class AddPromotionsToCategoriesImpl implements AddPromotionsToCategories {
    private promotionRepository: PromotionRepository;
    private categoryRepository: CategoryRepository;

    constructor(
        @inject(TYPES.PromotionRepository) promotionRepository: PromotionRepository,
        @inject(TYPES.CategoryRepository) categoryRepository: CategoryRepository
    ) {
        this.promotionRepository = promotionRepository;
        this.categoryRepository = categoryRepository;
    }

    async execute(categoryPromotionAssociations: CategoryPromotionAssociationDTO[]): Promise<void> {
        for (let i = 0; i < categoryPromotionAssociations.length; i++) {
            const promotionNotFound = !(await this.promotionRepository.findOnePromotionById(categoryPromotionAssociations[i].promotionId));
            if (promotionNotFound) throw new EntityNotFoundError("Promotion not found");
            const categoryNotFound = !(await this.categoryRepository.findCategoryById(categoryPromotionAssociations[i].categoryId));
            if (categoryNotFound) throw new EntityNotFoundError("Category not found");
            await this.promotionRepository.addPromotionToCategory(categoryPromotionAssociations[i]);
        }
    }
}