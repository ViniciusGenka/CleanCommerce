import AddressMapper from '../../application/mappers/addressMapper';
import AddressRepository from '../../application/repositories/addressRepository';
import { AddressDTO } from '../../domain/dtos/address/addressDTO';
import { CreateAddressDTO } from '../../domain/dtos/address/createAddressDTO';
import AddUserAddress from '../../application/usecases/addUserAddress';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import Address from '../../domain/entities/address';
import UserRepository from '../../application/repositories/userRepository';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class AddUserAddressImpl implements AddUserAddress {
	private addressRepository: AddressRepository;
	private userRepository: UserRepository;
	constructor(
		@inject(TYPES.AddressRepository) addressRepository: AddressRepository,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
	}

	async execute(
		addressData: CreateAddressDTO,
		userId: string
	): Promise<AddressDTO> {
		const addressEntity = new Address(
			addressData.city,
			addressData.complement,
			addressData.contactFullName,
			addressData.contactPhoneNumber,
			addressData.neighborhood,
			addressData.postalCode,
			addressData.state,
			addressData.street,
			addressData.streetNumber,
			userId
		);
		const userNotFound = !(await this.userRepository.findOneUserById(userId))
		if (userNotFound) throw new EntityNotFoundError("User not found")
		const savedAddress = await this.addressRepository.saveAddress(
			addressEntity
		);
		return AddressMapper.execute(savedAddress);
	}
}
