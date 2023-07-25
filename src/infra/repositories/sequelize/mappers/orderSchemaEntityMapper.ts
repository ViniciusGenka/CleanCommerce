import Order from '../../../../domain/entities/order';
import { OrderSchema } from '../schemas/orderSchema';
import { AddressSchemaEntityMapper } from './addressSchemaEntityMapper';
import DiscountCouponSchemaEntityMapper from './discountCouponSchemaEntityMapper';
import { OrderItemSchemaEntityMapper } from './orderItemSchemaEntityMapper';
import { UserSchemaEntityMapper } from './userSchemaEntityMapper';

export class OrderSchemaEntityMapper {
	static schemaToEntity(orderSchema: OrderSchema): Order {
		const destinationAddressEntity = AddressSchemaEntityMapper.schemaToEntity(
			orderSchema.destinationAddress
		);
		const orderItemEntities = OrderItemSchemaEntityMapper.schemasToEntities(
			orderSchema.items
		);
		const userEntity = UserSchemaEntityMapper.schemaToEntity(orderSchema.user);
		///vou ter que pegar o DiscountCoupon e o Promotion quando fizer a requisição de uma ordem,
		const discountCouponEntities = DiscountCouponSchemaEntityMapper.schemasToEntities(orderSchema.discountCoupons);
		return new Order(
			destinationAddressEntity,
			orderItemEntities,
			orderSchema.shippingCost,
			userEntity,
			discountCouponEntities,
			orderSchema.id
		);
	}

	static entityToSchema(orderEntity: Order): OrderSchema {
		return OrderSchema.build({
			userId: orderEntity.user.id,
			destinationAddressId: orderEntity.destinationAddress.id,
			paymentId: orderEntity.payment.id,
			paymentStatus: orderEntity.payment.status,
			shippingCost: orderEntity.shippingCost,
			shippingStatus: orderEntity.shippingStatus,
			status: orderEntity.status,
			originalPrice: orderEntity.originalPrice,
		});
	}

	static schemasToEntities(orderSchemas: OrderSchema[]): Order[] {
		let orderEntities: Order[] = [];
		for (let i = 0; i < orderSchemas.length; i++) {
			const destinationAddressEntity = AddressSchemaEntityMapper.schemaToEntity(
				orderSchemas[i].destinationAddress
			);
			const orderItemEntities = OrderItemSchemaEntityMapper.schemasToEntities(
				orderSchemas[i].items
			);
			const userEntity = UserSchemaEntityMapper.schemaToEntity(
				orderSchemas[i].user
			);
			const discountCouponEntities = DiscountCouponSchemaEntityMapper.schemasToEntities(orderSchemas[i].discountCoupons);
			const orderEntity = new Order(
				destinationAddressEntity,
				orderItemEntities,
				orderSchemas[i].shippingCost,
				userEntity,
				discountCouponEntities,
				orderSchemas[i].id
			);
			orderEntities.push(orderEntity);
		}
		return orderEntities;
	}
}
