import { AddressDTO } from '../address/addressDTO';
import { OrderItemDTO } from './orderItemDTO';
import { OrderStatus } from '../../enums/orderStatus';
import { ShippingStatus } from '../../enums/shippingStatus';
import { PaymentStatus } from '../../enums/paymentStatus';
import { DiscountCoupon } from '../../entities/discountCoupon';

export type OrderDTO = {
	id: string;
	userId: string;
	destinationAddress: AddressDTO;
	discountCoupons: DiscountCoupon[];
	discountedPrice: number;
	originalPrice: number;
	items: OrderItemDTO[];
	payment: {
		id: string | null;
		status: PaymentStatus;
	};
	status: OrderStatus;
	shippingCost: number;
	shippingStatus: ShippingStatus;
	createdAt: Date;
};
