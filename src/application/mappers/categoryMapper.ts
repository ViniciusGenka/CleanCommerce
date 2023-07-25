import Category from '../../domain/entities/category';
import { CategoryDTO } from '../../domain/dtos/category/categoryDTO';

export default class CategoryMapper {
    static execute(categoryEntity: Category): CategoryDTO {
        return {
            id: categoryEntity.id,
            name: categoryEntity.name,
        };
    }
}
