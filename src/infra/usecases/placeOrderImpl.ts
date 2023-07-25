import AddressRepository from '../../application/repositories/addressRepository';
import CalculateOrderShippingCostService from '../../domain/services/calculateOrderShippingCostService';
import OrderRepository from '../../application/repositories/orderRepository';
import OrderMapper from '../../application/mappers/orderMapper';
import ProductRepository from '../../application/repositories/productRepository';
import UserRepository from '../../application/repositories/userRepository';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import { ProductDeliveryRouteDTO } from '../../domain/dtos/product/productDeliveryRouteDTO';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import CalculateRouteShippingTimeService from '../../domain/services/calculateRouteShippingTimeService';
import Order from '../../domain/entities/order';
import OrderItem from '../../domain/entities/orderItem';
import PlaceOrder from '../../application/usecases/placeOrder';
import { PlaceOrderDTO } from '../../domain/dtos/order/placeOrderDTO';
import EmailService from '../../application/services/emailService';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import CustomError from '../../application/errors/customApplicationError';
import DiscountCouponRepository from '../../application/repositories/discountCouponRepository';
import { DiscountCoupon } from '../../domain/entities/discountCoupon';
import OrderItemChat from '../../domain/entities/orderItemChat';

@injectable()
export default class PlaceOrderImpl implements PlaceOrder {
	private readonly addressRepository: AddressRepository;
	private readonly discountCouponRepository: DiscountCouponRepository;
	private readonly orderRepository: OrderRepository;
	private readonly productRepository: ProductRepository;
	private readonly userRepository: UserRepository;
	private readonly calculateOrderShippingCostService: CalculateOrderShippingCostService;
	private readonly calculateRouteShippingTimeService: CalculateRouteShippingTimeService;
	private readonly emailService: EmailService;

	constructor(
		@inject(TYPES.AddressRepository) addressRepository: AddressRepository,
		@inject(TYPES.CalculateOrderShippingCostService)
		calculateOrderShippingCostService: CalculateOrderShippingCostService,
		@inject(TYPES.CalculateRouteShippingTimeService)
		calculateRouteShippingTimeService: CalculateRouteShippingTimeService,
		@inject(TYPES.DiscountCouponRepository) discountCouponRepository: DiscountCouponRepository,
		@inject(TYPES.EmailService) emailService: EmailService,
		@inject(TYPES.OrderRepository) orderRepository: OrderRepository,
		@inject(TYPES.ProductRepository) productRepository: ProductRepository,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.addressRepository = addressRepository;
		this.calculateOrderShippingCostService = calculateOrderShippingCostService;
		this.calculateRouteShippingTimeService = calculateRouteShippingTimeService;
		this.discountCouponRepository = discountCouponRepository;
		this.emailService = emailService;
		this.userRepository = userRepository;
		this.productRepository = productRepository;
		this.orderRepository = orderRepository;
	}

	async execute(
		destinationAddressId: string,
		productsToBuy: PlaceOrderDTO[],
		userId: string,
		discountCode?: string[],
	): Promise<OrderDTO> {
		const userEntity = await this.userRepository.findOneUserById(userId);
		if (!userEntity) throw new EntityNotFoundError("User not found");
		let deliveryRoutes: ProductDeliveryRouteDTO[] = [];
		const destinationAddress = await this.addressRepository.findOneAddressById(
			destinationAddressId
		);
		if (!destinationAddress) throw new EntityNotFoundError("Destination address not found");
		let orderItems: OrderItem[] = [];
		for (let i = 0; i < productsToBuy.length; i++) {
			const product = await this.productRepository.findOneProductById(
				productsToBuy[i].productId
			);
			if (!product) throw new EntityNotFoundError("Product not found");
			if (!product.haveEnoughStock(productsToBuy[i].quantity))
				throw new CustomError(
					`Product ${productsToBuy[i].productId} is not available for this quantity`, 400
				);
			const estimatedProductShippingTime =
				await this.calculateRouteShippingTimeService.execute({
					originAddress: product.stockAddress.postalCode,
					destinationAddress: destinationAddress.postalCode,
				});

			const orderItemChat = new OrderItemChat(userId, product.userId)
			const orderItem = new OrderItem(
				orderItemChat,
				estimatedProductShippingTime,
				product.discountedPrice,
				productsToBuy[i].quantity,
				product.stockAddress,
				product.title
			);
			orderItems.push(orderItem);
		}
		//se tiver discountCoupons, verificar validade deles
		//se forem válidos, cria as entidades deles
		//se todos forem válidos, coloca na orderEntity
		const discountCouponEntities: DiscountCoupon[] = [];
		if (discountCode.length > 0) {
			for (let i = 0; i < discountCode.length; i++) {
				const discountCouponEntity = await this.discountCouponRepository.findOneDiscountCouponByDiscountCode(discountCode[i]);
				if (!discountCouponEntity) throw new CustomError("Discount coupon not found", 400);
				if (!discountCouponEntity.isValid()) throw new CustomError("Discount coupon expired", 400);
				discountCouponEntities.push(discountCouponEntity);
			}
		}

		const orderEntity = new Order(
			destinationAddress,
			orderItems,
			await this.calculateOrderShippingCostService.execute(deliveryRoutes),
			userEntity,
			discountCouponEntities
		);
		let savedOrder = await this.orderRepository.saveOrder(orderEntity);
		await this.emailService.sendEmail(
			"no-reply@ecommerce.com",
			userEntity.email,
			`Pedido ${savedOrder.id} realizado com sucesso!`,
			"O seu pedido 34294157 foi realizado com sucesso! Para que o produto siga para entrega, aguardamos seu pagamento. *Se você já realizou a transferência, desconsidere esta mensagem.",
			`<!DOCTYPE html>
			<html>
			<head>
			<title>Confirmação de Pedido</title>
			<style>
				/* Estilos personalizados */
				body {
				font-family: Arial, sans-serif;
				background-color: #f7f7f7;
				}

				.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				background-color: #ffffff;
				border: 1px solid #e0e0e0;
				border-radius: 4px;
				}

				h1 {
				color: #333333;
				}

				p {
				color: #666666;
				}

				.button {
				display: inline-block;
				background-color: #4caf50;
				color: #ffffff;
				text-decoration: none;
				padding: 10px 20px;
				border-radius: 4px;
				margin-top: 20px;
				}
			</style>
			</head>
			<body>
			<div class="container">
				<h1>O seu pedido <span style="color: #4caf50;">${savedOrder.id}</span> foi realizado com sucesso!</h1>
				<p>Para que o produto siga para entrega, aguardamos seu pagamento.</p>
				<p><em>Se você já realizou a transferência, desconsidere esta mensagem.</em></p>
				<a class="button" href="http://localhost:3000/orders/${savedOrder.id}/pay">Realizar Pagamento</a>
			</div>
			</body>
			</html>`
		)
		return OrderMapper.execute(savedOrder);
	}
}