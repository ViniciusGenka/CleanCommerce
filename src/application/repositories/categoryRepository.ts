import { ProductCategoryAssociationDTO } from "../../domain/dtos/category/productCategoryAssociationDTO";
import Category from "../../domain/entities/category";

export default interface CategoryRepository {
    saveCategory(category: Category): Promise<Category>;
    addCategoryToProduct(productCategoryAssociation: ProductCategoryAssociationDTO): Promise<void>;
    findCategoryById(categoryId: string): Promise<Category>;
    findCategoriesById(categoryIds: string[]): Promise<Category[]>;
}
