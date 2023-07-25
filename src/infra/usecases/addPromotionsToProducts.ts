import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import ProductRepository from '../../application/repositories/productRepository';
import PromotionRepository from '../../application/repositories/promotionRepository';
import { ProductPromotionAssociationDTO } from '../../domain/dtos/promotion/productPromotionAssociationDTO';
import AddPromotionsToProducts from '../../application/usecases/addPromotionsToProducts';

@injectable()
export default class AddPromotionsToProductsImpl implements AddPromotionsToProducts {
    private promotionRepository: PromotionRepository;
    private productRepository: ProductRepository;

    constructor(
        @inject(TYPES.PromotionRepository) promotionRepository: PromotionRepository,
        @inject(TYPES.ProductRepository) productRepository: ProductRepository
    ) {
        this.promotionRepository = promotionRepository;
        this.productRepository = productRepository;
    }

    async execute(productPromotionAssociations: ProductPromotionAssociationDTO[]): Promise<void> {
        for (let i = 0; i < productPromotionAssociations.length; i++) {
            const promotionNotFound = !(await this.promotionRepository.findOnePromotionById(productPromotionAssociations[i].promotionId));
            if (promotionNotFound) throw new EntityNotFoundError("Promotion not found");
            const productNotFound = !(await this.productRepository.findOneProductById(productPromotionAssociations[i].productId));
            if (productNotFound) throw new EntityNotFoundError("Product not found");
            await this.promotionRepository.addPromotionToProduct(productPromotionAssociations[i]);
        }
    }
}