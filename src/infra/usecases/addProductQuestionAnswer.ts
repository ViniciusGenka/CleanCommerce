import ProductRepository from '../../application/repositories/productRepository';
import ProductQuestionAnswerMapper from '../../application/mappers/productQuestionAnswerMapper';
import { CreateProductQuestionAnswerDTO } from '../../domain/dtos/product/createProductQuestionAnswerDTO';
import { ProductQuestionAnswerDTO } from '../../domain/dtos/product/productQuestionAnswerDTO';
import AddProductQuestionAnswer from '../../application/usecases/addProductQuestionAnswer';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import ProductQuestionAnswer from '../../domain/entities/productQuestionAnswer';
import { ProductQuestionAnswerValidator } from '../../application/validators/productQuestionAnswerValidator';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import UnauthorizedError from '../../application/errors/unauthorizedError';

@injectable()
export default class AddProductQuestionAnswerImpl implements AddProductQuestionAnswer {
    private productRepository: ProductRepository;
    private userRepository: UserRepository;
    private productQuestionAnswerValidator: ProductQuestionAnswerValidator;
    constructor(
        @inject(TYPES.ProductRepository) productRepository: ProductRepository,
        @inject(TYPES.ProductQuestionAnswerValidator) productQuestionAnswerValidator: ProductQuestionAnswerValidator,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.productRepository = productRepository;
        this.productQuestionAnswerValidator = productQuestionAnswerValidator
        this.userRepository = userRepository;
    }

    async execute(
        questionId: string,
        questionAnswerData: CreateProductQuestionAnswerDTO,
        userId: string
    ): Promise<ProductQuestionAnswerDTO> {
        this.productQuestionAnswerValidator.validate(questionAnswerData);
        const productQuestionAnswer = new ProductQuestionAnswer(
            questionId,
            questionAnswerData.text,
            userId
        );
        const productQuestion = await this.productRepository.findOneProductQuestionById(questionId);
        if (!productQuestion) throw new EntityNotFoundError('Question not found')
        const userNotFound = !(await this.userRepository.findOneUserById(userId))
        if (userNotFound) throw new EntityNotFoundError("User not found")
        const product = await this.productRepository.findOneProductById(productQuestion.productId);
        if (product.userId != userId) throw new UnauthorizedError("Only the seller of the product is allowed to answer questions")
        const savedProductQuestionAnswer = await this.productRepository.saveProductQuestionAnswer(
            productQuestionAnswer
        );
        return ProductQuestionAnswerMapper.execute(savedProductQuestionAnswer);
    }
}
