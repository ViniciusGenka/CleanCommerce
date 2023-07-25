import { ProductVariationDetails } from '../dtos/product/productVariationDetailsDTO';
import Address from './address';
import Category from './category';
import ProductQuestion from './productQuestion';
import ProductReview from './productReview';
import { Promotion } from './promotion';

export default class Product {
	public id: string | null;
	public categories: Category[];
	public userId: string;
	public title: string;
	public description: string;
	public promotions: Promotion[];
	public price: number;
	public discountedPrice: number;
	public questions: ProductQuestion[];
	public reviews: ProductReview[];
	public stockQuantity: number;
	public stockAddress: Address;
	public variation: ProductVariationDetails | null;

	constructor(
		categories: Category[],
		description: string,
		price: number,
		stockAddress: Address,
		stockQuantity: number,
		title: string,
		userId: string,
		variation: ProductVariationDetails = null,
		id: string = null,
		promotions: Promotion[] = [],
		questions: ProductQuestion[] = [],
		reviews: ProductReview[] = [],
	) {
		this.id = id;
		this.categories = categories;
		this.description = description;
		this.price = price;
		this.questions = questions;
		this.reviews = reviews;
		this.stockQuantity = stockQuantity;
		this.stockAddress = stockAddress;
		this.title = title;
		this.userId = userId;
		this.variation = variation;
		this.promotions = promotions;
		this.discountedPrice = this.calculateDiscountedPrice();
	}

	haveEnoughStock(quantityToBuy: number): boolean {
		return this.stockQuantity >= quantityToBuy;
	}

	decrementStockQuantity(quantityToDecrement: number): void {
		this.stockQuantity -= quantityToDecrement;
	}

	calculateDiscountedPrice(): number {
		let categoryPromotionsDiscount = 0;
		for (let i = 0; i < this.categories.length; i++) {
			const categoryDiscount = this.categories[i].promotions.reduce(
				(accumulator, currentPromotion) =>
					(accumulator += currentPromotion.discountValue),
				0
			);
			categoryPromotionsDiscount += categoryDiscount;
		}
		const productPromotionsDiscountValue = this.promotions.reduce(
			(accumulator, currentItem) =>
				(accumulator += currentItem.discountValue),
			0
		);
		return categoryPromotionsDiscount + productPromotionsDiscountValue;
	}
}
