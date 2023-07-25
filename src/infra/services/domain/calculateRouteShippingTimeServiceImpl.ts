import { ProductDeliveryRouteDTO } from '../../../domain/dtos/product/productDeliveryRouteDTO';
import { injectable } from 'inversify';
import { calcularPrecoPrazo } from 'correios-brasil';
import CalculateRouteShippingTimeService from '../../../domain/services/calculateRouteShippingTimeService';

@injectable()
export default class CalculateRouteShippingTimeServiceImpl
	implements CalculateRouteShippingTimeService
{
	async execute(deliveryRoute: ProductDeliveryRouteDTO): Promise<number> {
		let args = {
			sCepOrigem: deliveryRoute.originAddress,
			sCepDestino: deliveryRoute.destinationAddress,
			nVlPeso: '1',
			nCdFormato: '1',
			nVlComprimento: '20',
			nVlAltura: '20',
			nVlLargura: '20',
			nCdServico: ['04014', '04510'],
			nVlDiametro: '0',
		};
		const routeShippingTime = await calcularPrecoPrazo(args).then(
			(response) => response[0].PrazoEntrega
		);
		return parseInt(routeShippingTime);
	}
}
