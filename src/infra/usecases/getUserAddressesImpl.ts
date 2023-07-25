import AddressMapper from '../../application/mappers/addressMapper';
import AddressRepository from '../../application/repositories/addressRepository';
import UserRepository from '../../application/repositories/userRepository';
import { AddressDTO } from '../../domain/dtos/address/addressDTO';
import GetUserAddresses from '../../application/usecases/getUserAddresses';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class GetUserAddressesImpl implements GetUserAddresses {
	private readonly addressRepository: AddressRepository;
	private readonly userRepository: UserRepository;
	constructor(
		@inject(TYPES.AddressRepository) addressRepository: AddressRepository,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
	}

	async execute(userId: string): Promise<AddressDTO[]> {
		const userNotFound = !(await this.userRepository.findOneUserById(userId));
		if (userNotFound) throw new EntityNotFoundError("User not found");
		const addressEntities = await this.addressRepository.findAddressesByUserId(
			userId
		);
		const addressesResponse: AddressDTO[] = [];
		addressEntities.forEach((addressEntity) => {
			addressesResponse.push(AddressMapper.execute(addressEntity));
		});
		return addressesResponse;
	}
}
