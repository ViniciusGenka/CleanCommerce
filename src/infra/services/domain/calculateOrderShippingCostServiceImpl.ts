import CalculateOrderShippingCostService from '../../../domain/services/calculateOrderShippingCostService';
import CalculateRouteShippingCostService from '../../../domain/services/calculateRouteShippingCostService';
import { ProductDeliveryRouteDTO } from '../../../domain/dtos/product/productDeliveryRouteDTO';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../configs/inversify.types';

@injectable()
export default class CalculateOrderShippingCostServiceImpl
	implements CalculateOrderShippingCostService
{
	private calculateRouteShippingCostService: CalculateRouteShippingCostService;

	constructor(
		@inject(TYPES.CalculateRouteShippingCostService)
		calculateRouteShippingCostService: CalculateRouteShippingCostService
	) {
		this.calculateRouteShippingCostService = calculateRouteShippingCostService;
	}

	async execute(deliveryRoutes: ProductDeliveryRouteDTO[]): Promise<number> {
		const uniqueDeliveryRoutes = deliveryRoutes.reduce(
			(
				accumulator: ProductDeliveryRouteDTO[],
				route: ProductDeliveryRouteDTO
			) => {
				const routeExists = accumulator.some(
					(existingRoute) =>
						JSON.stringify(existingRoute.originAddress) ===
							JSON.stringify(route.originAddress) &&
						JSON.stringify(existingRoute.destinationAddress) ===
							JSON.stringify(route.destinationAddress)
				);

				if (!routeExists) {
					accumulator.push(route);
				}

				return accumulator;
			},
			[]
		);
		const shippingCost = uniqueDeliveryRoutes.reduce(
			async (
				accumulatorPromise: Promise<number>,
				route: ProductDeliveryRouteDTO
			) => {
				const accumulator = await accumulatorPromise;
				const routeCost = await this.calculateRouteShippingCostService.execute(
					route
				);
				return accumulator + routeCost;
			},
			Promise.resolve(0)
		);
		return shippingCost;
	}
}
