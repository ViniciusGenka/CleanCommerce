import Address from '../../entities/address';
import { CategoryDTO } from '../category/categoryDTO';
import { PromotionDTO } from '../promotion/promotionDTO';
import { ProductQuestionDTO } from './productQuestionDTO';
import { ProductReviewDTO } from './productReviewDTO';
import { ProductVariationDTO } from './productVariationDTO';
import { ProductVariationDetails } from './productVariationDetailsDTO';

export type ProductDTO = {
	id: string;
	userId: string;
	title: string;
	description: string;
	price: number;
	categories: CategoryDTO[];
	reviews: ProductReviewDTO[];
	promotions: PromotionDTO[];
	questions: ProductQuestionDTO[];
	stockQuantity: number;
	stockAddress: Address;
	variation: {
		details: ProductVariationDetails;
		products: ProductVariationDTO[];
	};
};
