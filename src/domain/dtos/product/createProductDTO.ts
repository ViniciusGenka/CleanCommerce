import { CreateProductVariationDTO } from './createProductVariationDTO';
import { ProductVariationDetails } from './productVariationDetailsDTO';

export type CreateProductDTO = {
	title: string;
	description: string;
	price: number;
	categoryIds: string[];
	stockQuantity: number;
	stockAddressId: string;
	variation?: {
		details: ProductVariationDetails;
		products: CreateProductVariationDTO[];
	}
};

//mudei aqui para deixar em vez de null com a interrogaçao