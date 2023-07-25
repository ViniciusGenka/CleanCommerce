import Order from '../../domain/entities/order';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';

export default class OrderMapper {
	static execute(orderEntity: Order): OrderDTO {
		return {
			id: orderEntity.id,
			userId: orderEntity.user.id,
			destinationAddress: orderEntity.destinationAddress,
			discountedPrice: orderEntity.discountedPrice,
			discountCoupons: orderEntity.discountCoupons,
			items: orderEntity.items,
			payment: orderEntity.payment,
			status: orderEntity.status,
			shippingCost: orderEntity.shippingCost,
			shippingStatus: orderEntity.shippingStatus,
			originalPrice: orderEntity.originalPrice,
			createdAt: orderEntity.createdAt,
		};
	}
}
