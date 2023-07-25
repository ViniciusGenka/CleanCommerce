import { ReviewRating } from '../../enums/reviewRating';

export type ProductReviewDTO = {
	id: string;
	userId: string;
	productId: string;
	rating: number;
	text: string;
};
