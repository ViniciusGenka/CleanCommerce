import { ProductDeliveryRouteDTO } from '../dtos/product/productDeliveryRouteDTO';

export default interface CalculateRouteShippingCostService {
	execute(deliveryRoute: ProductDeliveryRouteDTO): Promise<number>;
}
