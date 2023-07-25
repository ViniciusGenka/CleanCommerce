import AddressRepository from '../../application/repositories/addressRepository';
import ProductRepository from '../../application/repositories/productRepository';
import ProductMapper from '../../application/mappers/productMapper';
import UserRepository from '../../application/repositories/userRepository';
import { ProductDTO } from '../../domain/dtos/product/productDTO';
import { CreateProductDTO } from '../../domain/dtos/product/createProductDTO';
import AddProducts from '../../application/usecases/addProducts';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import Product from '../../domain/entities/product';
import crypto from 'crypto';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import CategoryRepository from '../../application/repositories/categoryRepository';

@injectable()
export default class AddProductsImpl implements AddProducts {
	private readonly addressRepository: AddressRepository;
	private readonly categoryRepository: CategoryRepository;
	private readonly productRepository: ProductRepository;
	private readonly userRepository: UserRepository;
	constructor(
		@inject(TYPES.AddressRepository) addressRepository: AddressRepository,
		@inject(TYPES.CategoryRepository) categoryRepository: CategoryRepository,
		@inject(TYPES.ProductRepository) productRepository: ProductRepository,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.addressRepository = addressRepository;
		this.categoryRepository = categoryRepository;
		this.productRepository = productRepository;
		this.userRepository = userRepository;
	}

	async execute(
		productsDataList: CreateProductDTO[],
		userId: string
	): Promise<ProductDTO[]> {
		const userNotFound = !(await this.userRepository.findOneUserById(userId))
		if (userNotFound) throw new EntityNotFoundError("User not found");
		const productsResponse: ProductDTO[] = [];
		for (let i = 0; i < productsDataList.length; i++) {
			const stockAddressEntity =
				await this.addressRepository.findOneAddressById(
					productsDataList[i].stockAddressId
				);

			if (!stockAddressEntity) throw new EntityNotFoundError("Stock address not found");
			const productVariationDetails = productsDataList[i].variation?.details;
			const variationGroupId = crypto.randomUUID();
			if (productsDataList[i].variation?.products) {
				productVariationDetails.groupId = variationGroupId;
			}
			const categoryEntities = await this.categoryRepository.findCategoriesById(productsDataList[i].categoryIds)
			const productEntity = new Product(
				categoryEntities,
				productsDataList[i].description,
				productsDataList[i].price,
				stockAddressEntity,
				productsDataList[i].stockQuantity,
				productsDataList[i].title,
				userId,
				productVariationDetails
			);
			const savedProduct = await this.productRepository.saveProduct(
				productEntity
			);
			//save product variations, if exists
			const productVariations: Product[] = [];
			if (productsDataList[i].variation?.products) {
				for (
					let j = 0;
					j < productsDataList[i].variation.products.length;
					j++
				) {
					const productVariationStockAddressEntity = await this.addressRepository.findOneAddressById(
						productsDataList[i].variation.products[j].stockAddressId
					)
					if (!productVariationStockAddressEntity) throw new EntityNotFoundError("Stock address of variation not found");
					const productVariationDetails = {
						...productsDataList[i].variation.products[j].variation.details,
						groupId: variationGroupId,
					};
					const categoryEntities = await this.categoryRepository.findCategoriesById(productsDataList[i].variation.products[j].categoryIds);
					const productVariationEntity = new Product(
						categoryEntities,
						productsDataList[i].variation.products[j].description,
						productsDataList[i].variation.products[j].price,
						productVariationStockAddressEntity,
						productsDataList[i].variation.products[j].stockQuantity,
						productsDataList[i].variation.products[j].title,
						userId,
						productVariationDetails
					);
					const savedProductVariation =
						await this.productRepository.saveProduct(productVariationEntity);
					productVariations.push(savedProductVariation);
				}
			}
			productsResponse.push(
				ProductMapper.execute(savedProduct, productVariations)
			);
		}
		return productsResponse;
	}
}

//em vez de ir salvando e depois vendo a validade do próximo, é melhor primeiro ver a validade de todos e só depois ir salvando, pois assim fica meio inconsistente