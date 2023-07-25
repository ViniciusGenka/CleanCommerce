import { ProductDeliveryRouteDTO } from '../dtos/product/productDeliveryRouteDTO';

export default interface CalculateRouteShippingTimeService {
	execute(deliveryRoute: ProductDeliveryRouteDTO): Promise<number>;
}
