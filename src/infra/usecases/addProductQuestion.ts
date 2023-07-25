import ProductRepository from '../../application/repositories/productRepository';
import ProductQuestionMapper from '../../application/mappers/productQuestionMapper';
import { CreateProductQuestionDTO } from '../../domain/dtos/product/createProductQuestionDTO';
import { ProductQuestionDTO } from '../../domain/dtos/product/productQuestionDTO';
import AddProductQuestion from '../../application/usecases/addProductQuestion';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import ProductQuestion from '../../domain/entities/productQuestion';
import { ProductQuestionValidator } from '../../application/validators/productQuestionValidator';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class AddProductQuestionImpl implements AddProductQuestion {
    private productRepository: ProductRepository;
    private userRepository: UserRepository;
    private ProductQuestionValidator: ProductQuestionValidator;
    constructor(
        @inject(TYPES.ProductRepository) productRepository: ProductRepository,
        @inject(TYPES.ProductQuestionValidator) ProductQuestionValidator: ProductQuestionValidator,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.productRepository = productRepository;
        this.ProductQuestionValidator = ProductQuestionValidator
        this.userRepository = userRepository;
    }

    async execute(
        productId: string,
        questionData: CreateProductQuestionDTO,
        userId: string
    ): Promise<ProductQuestionDTO> {
        this.ProductQuestionValidator.validate(questionData);
        const productQuestionEntity = new ProductQuestion(
            productId,
            questionData.text,
            userId
        );
        const productNotFound = !(await this.productRepository.findOneProductById(productId))
        if (productNotFound) throw new EntityNotFoundError('Product not found')
        const userNotFound = !(await this.userRepository.findOneUserById(userId))
        if (userNotFound) throw new EntityNotFoundError("User not found")
        const savedProductQuestion = await this.productRepository.saveProductQuestion(
            productQuestionEntity
        );
        return ProductQuestionMapper.execute(savedProductQuestion);
    }
}
