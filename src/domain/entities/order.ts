import { OrderStatus } from '../enums/orderStatus';
import { PaymentStatus } from '../enums/paymentStatus';
import { ShippingStatus } from '../enums/shippingStatus';
import Address from './address';
import { DiscountCoupon } from './discountCoupon';
import OrderItem from './orderItem';
import User from './user';

export default class Order {
	public createdAt: Date;
	public destinationAddress: Address;
	public discountCoupons: DiscountCoupon[];
	public discountedPrice: number;
	public originalPrice: number;
	public id: string | null;
	public items: OrderItem[];
	public shippingCost: number;
	public shippingStatus: ShippingStatus;
	public status: OrderStatus;
	public user: User;
	public payment: {
		id: string | null;
		status: PaymentStatus;
	};

	constructor(
		destinationAddress: Address,
		items: OrderItem[],
		shippingCost: number,
		user: User,
		discountCoupons?: DiscountCoupon[],
		id?: string
	) {
		this.createdAt = new Date();
		this.destinationAddress = destinationAddress;
		this.id = id ? id : null;
		this.items = items;
		this.payment = {
			id: null,
			status: PaymentStatus.PENDING,
		};
		this.shippingCost = shippingCost;
		this.shippingStatus = ShippingStatus.AWAITING_APPROVAL;
		this.status = OrderStatus.PENDING;
		this.discountCoupons = discountCoupons ? discountCoupons : [];
		this.originalPrice = this.calculateOriginalPrice();
		this.discountedPrice = discountCoupons ? this.calculateDiscountedPrice() : 0;
		this.user = user;
	}

	calculateOriginalPrice(): number {
		return (
			this.items.reduce(
				(accumulator, currentItem) =>
					(accumulator += currentItem.calculateItemPrice()),
				0
			) + this.shippingCost
		);
	}

	calculateDiscountedPrice(): number {
		const couponsDiscountValue = this.discountCoupons.reduce(
			(accumulator, currentItem) =>
				(accumulator += currentItem.discountValue),
			0
		);
		return this.originalPrice - couponsDiscountValue;
	}
}
