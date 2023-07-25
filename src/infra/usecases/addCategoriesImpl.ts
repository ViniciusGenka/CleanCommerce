import AddCategories from '../../application/usecases/addCategories';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import { CreateCategoryDTO } from '../../domain/dtos/category/createCategoryDTO';
import Category from '../../domain/entities/category';
import CategoryRepository from '../../application/repositories/categoryRepository';
import { CategoryDTO } from '../../domain/dtos/category/categoryDTO';
import CategoryMapper from '../../application/mappers/categoryMapper';

@injectable()
export default class AddCategoriesImpl implements AddCategories {
    private userRepository: UserRepository;
    private categoryRepository: CategoryRepository;
    constructor(
        @inject(TYPES.CategoryRepository) categoryRepository: CategoryRepository,
        @inject(TYPES.UserRepository) userRepository: UserRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    async execute(
        categories: CreateCategoryDTO[],
        userId: string
    ): Promise<CategoryDTO[]> {
        const userNotFound = !(await this.userRepository.findOneUserById(userId))
        if (userNotFound) throw new EntityNotFoundError("User not found")
        const savedCategories: CategoryDTO[] = [];
        for (let i = 0; i < categories.length; i++) {
            const categoryEntity = new Category(categories[i].name);
            const savedCategory = await this.categoryRepository.saveCategory(categoryEntity);
            savedCategories.push(CategoryMapper.execute(savedCategory));
        }
        return savedCategories
    }
}

//talvez não deixar que categorias com o mesmo nome sejam criadas