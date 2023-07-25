import { ProductDTO } from '../../domain/dtos/product/productDTO';
import { CreateProductDTO } from '../../domain/dtos/product/createProductDTO';

export default interface AddProducts {
	execute(
		productsDataList: CreateProductDTO[],
		userId: string
	): Promise<ProductDTO[]>;
}
