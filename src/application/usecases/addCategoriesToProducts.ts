import { ProductCategoryAssociationDTO } from '../../domain/dtos/category/productCategoryAssociationDTO';

export default interface AddCategoriesToProducts {
    execute(
        productCategoryAssociations: ProductCategoryAssociationDTO[]
    ): Promise<void>;
}
