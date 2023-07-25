import Product from '../../domain/entities/product';
import { ProductDTO } from '../../domain/dtos/product/productDTO';
import { ProductVariationDTO } from '../../domain/dtos/product/productVariationDTO';

export default class ProductMapper {
	static execute(
		productEntity: Product,
		productVariations?: Product[]
	): ProductDTO {
		const mappedProductVariations: ProductVariationDTO[] =
			productVariations.map((product) => {
				const variationDetails = product.variation;
				return {
					...product,
					variation: { details: variationDetails },
				};
			});
		return {
			id: productEntity.id,
			userId: productEntity.userId,
			title: productEntity.title,
			description: productEntity.description,
			price: productEntity.price,
			reviews: productEntity.reviews,
			promotions: productEntity.promotions,
			questions: productEntity.questions,
			stockQuantity: productEntity.stockQuantity,
			stockAddress: productEntity.stockAddress,
			categories: productEntity.categories,
			variation: {
				details: productEntity.variation,
				products: mappedProductVariations,
			},
		};
	}
}
