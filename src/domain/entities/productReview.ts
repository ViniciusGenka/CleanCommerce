import { ReviewRating } from '../enums/reviewRating';

export default class ProductReview {
	public id: string | null;
	public productId: string;
	public rating: number;
	public text: string;
	public userId: string;

	constructor(
		productId: string,
		rating: number,
		text: string,
		userId: string,
		id?: string
	) {
		this.id = id ? id : null;
		this.productId = productId;
		this.rating = rating;
		this.text = text;
		this.userId = userId;
	}
}
