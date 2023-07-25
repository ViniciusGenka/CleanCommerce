import Address from '../../domain/entities/address';

export default interface AddressRepository {
	saveAddress(address: Address): Promise<Address>;
	findOneAddressById(addressId: string): Promise<Address | null>;
	findAddressesByUserId(userId: string): Promise<Address[]>;
}
