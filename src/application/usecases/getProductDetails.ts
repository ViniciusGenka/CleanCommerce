import { ProductDTO } from '../../domain/dtos/product/productDTO';

export default interface GetProductDetails {
	execute(productId: string): Promise<ProductDTO>;
}
