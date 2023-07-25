import Address from '../../../domain/entities/address';
import AddressRepository from '../../../application/repositories/addressRepository';
import EntityNotFoundError from '../../../domain/errors/entityNotFoundError';
import { injectable } from 'inversify';
import crypto from 'crypto';

@injectable()
export default class AddressRepositoryInMemory implements AddressRepository {
	public addresses: Address[] = [];

	async saveAddress(address: Address): Promise<Address> {
		address.id = crypto.randomUUID();
		this.addresses.push(address);
		return address;
	}

	async findOneAddressById(addressId: string): Promise<Address> {
		if (this.addresses.length === 0)
			throw new EntityNotFoundError('No address found');
		return this.addresses.find((address) => address.id === addressId);
	}

	async findAddressesByUserId(userId: string): Promise<Address[]> {
		if (this.addresses.length === 0)
			throw new EntityNotFoundError('No address found');
		return this.addresses.filter((address) => address.userId === userId);
	}
}
