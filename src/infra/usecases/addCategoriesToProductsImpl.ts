import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import AddCategoriesToProducts from '../../application/usecases/addCategoriesToProducts';
import ProductRepository from '../../application/repositories/productRepository';
import CategoryRepository from '../../application/repositories/categoryRepository';
import { ProductCategoryAssociationDTO } from '../../domain/dtos/category/productCategoryAssociationDTO';

@injectable()
export default class AddCategoriesToProductsImpl implements AddCategoriesToProducts {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;

    constructor(
        @inject(TYPES.ProductRepository) productRepository: ProductRepository,
        @inject(TYPES.CategoryRepository) categoryRepository: CategoryRepository
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    async execute(
        productCategoryAssociations: ProductCategoryAssociationDTO[]
    ): Promise<void> {
        for (let i = 0; i < productCategoryAssociations.length; i++) {
            const productNotFound = !(await this.productRepository.findOneProductById(productCategoryAssociations[i].productId));
            if (productNotFound) throw new EntityNotFoundError("Product not found");
            const categoryNotFound = !(await this.categoryRepository.findCategoryById(productCategoryAssociations[i].categoryId));
            if (categoryNotFound) throw new EntityNotFoundError("Category not found");
            await this.categoryRepository.addCategoryToProduct(productCategoryAssociations[i]);
        }
    }
}