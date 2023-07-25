import { inject, injectable } from 'inversify';
import { ProductDeliveryRouteDTO } from '../../domain/dtos/product/productDeliveryRouteDTO';
import ProductRepository from '../../application/repositories/productRepository';
import CalculateRouteShippingCostService from '../../domain/services/calculateRouteShippingCostService';
import { TYPES } from '../configs/inversify.types';
import CalculateRouteShippingTimeService from '../../domain/services/calculateRouteShippingTimeService';
import GetProductShippingEstimates from '../../application/usecases/getProductShippingEstimates';
import { ProductShippingEstimatesDTO } from '../../domain/dtos/product/productShippingEstimatesDTO';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import PostalCodeValidator from '../../application/validators/postalCodeValidator';

@injectable()
export default class GetProductShippingEstimatesImpl
	implements GetProductShippingEstimates {
	private calculateRouteShippingCostService: CalculateRouteShippingCostService;
	private calculateRouteShippingTimeService: CalculateRouteShippingTimeService;
	private postalCodeValidator: PostalCodeValidator;
	private productRepository: ProductRepository;



	constructor(
		@inject(TYPES.CalculateRouteShippingCostService)
		calculateRouteShippingCostService: CalculateRouteShippingCostService,
		@inject(TYPES.CalculateRouteShippingTimeService)
		calculateRouteShippingTimeService: CalculateRouteShippingTimeService,
		@inject(TYPES.PostalCodeValidator) postalCodeValidator: PostalCodeValidator,
		@inject(TYPES.ProductRepository) productRepository: ProductRepository
	) {
		this.calculateRouteShippingCostService = calculateRouteShippingCostService;
		this.calculateRouteShippingTimeService = calculateRouteShippingTimeService;
		this.postalCodeValidator = postalCodeValidator;
		this.productRepository = productRepository;
	}

	async execute(
		destinationPostalCode: string,
		productId: string
	): Promise<ProductShippingEstimatesDTO> {
		this.postalCodeValidator.validate(destinationPostalCode);
		const product = await this.productRepository.findOneProductById(productId);
		if (!product) throw new EntityNotFoundError('Product not found');
		const originPostalCode = product.stockAddress.postalCode;
		const deliveryRoute: ProductDeliveryRouteDTO = {
			originAddress: originPostalCode,
			destinationAddress: destinationPostalCode,
		};
		return {
			shippingCost: await this.calculateRouteShippingCostService.execute(
				deliveryRoute
			),
			shippingTime: await this.calculateRouteShippingTimeService.execute(
				deliveryRoute
			),
		};
	}
}
