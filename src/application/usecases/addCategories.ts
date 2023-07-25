import { CategoryDTO } from '../../domain/dtos/category/categoryDTO';
import { CreateCategoryDTO } from '../../domain/dtos/category/createCategoryDTO';

export default interface AddCategories {
    execute(
        categories: CreateCategoryDTO[],
        userId: string
    ): Promise<CategoryDTO[]>;
}
