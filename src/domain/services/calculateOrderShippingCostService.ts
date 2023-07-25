import { ProductDeliveryRouteDTO } from '../dtos/product/productDeliveryRouteDTO';

export default interface CalculateOrderShippingCostService {
	execute(deliveryRoutes: ProductDeliveryRouteDTO[]): Promise<number>;
}
