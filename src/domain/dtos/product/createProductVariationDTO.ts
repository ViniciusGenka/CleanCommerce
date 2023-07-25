import { CategoryDTO } from '../category/categoryDTO';
import { ProductVariationDetails } from './productVariationDetailsDTO';

export type CreateProductVariationDTO = {
	title: string;
	description: string;
	price: number;
	categoryIds: string[];
	stockQuantity: number;
	stockAddressId: string;
	variation: {
		details: ProductVariationDetails;
	};
};
