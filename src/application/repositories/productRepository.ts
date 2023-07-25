import { CreateProductDTO } from '../../domain/dtos/product/createProductDTO';
import Product from '../../domain/entities/product';
import ProductQuestion from '../../domain/entities/productQuestion';
import ProductQuestionAnswer from '../../domain/entities/productQuestionAnswer';
import ProductReview from '../../domain/entities/productReview';

export default interface ProductRepository {
	saveProduct(product: Product): Promise<Product>;
	saveProductReview(productReview: ProductReview): Promise<ProductReview>;
	findOneProductById(productId: string): Promise<Product | null>;
	findOneProductByIdAndUpdate(
		productId: string,
		update: CreateProductDTO
	): Promise<Product>;
	findProductReviewsByProductId(productId: string): Promise<ProductReview[]>;
	findProductsByVariationGroupId(variationGroupId: string): Promise<Product[]>;
	saveProductQuestion(productQuestion: ProductQuestion): Promise<ProductQuestion>;
	findOneProductQuestionById(productQuestionId: string): Promise<ProductQuestion>;
	findAllProductQuestionsByProductId(productId: string): Promise<ProductQuestion[]>;
	saveProductQuestionAnswer(productQuestionAnswer: ProductQuestionAnswer): Promise<ProductQuestionAnswer>;
}
