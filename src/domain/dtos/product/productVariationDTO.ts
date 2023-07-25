import Address from '../../entities/address';
import ProductReview from '../../entities/productReview';
import { ProductVariationDetails } from './productVariationDetailsDTO';

export type ProductVariationDTO = {
	id: string;
	userId: string;
	title: string;
	description: string;
	price: number;
	reviews: ProductReview[];
	stockQuantity: number;
	stockAddress: Address;
	variation: {
		details: ProductVariationDetails;
	};
};
