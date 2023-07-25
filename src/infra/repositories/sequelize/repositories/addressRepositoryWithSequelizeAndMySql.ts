import Address from '../../../../domain/entities/address';
import AddressRepository from '../../../../application/repositories/addressRepository';
import { injectable } from 'inversify';
import { AddressSchema } from '../schemas/addressSchema';
import { AddressSchemaEntityMapper } from '../mappers/addressSchemaEntityMapper';

@injectable()
export default class AddressRepositoryWithSequelizeAndMySql
	implements AddressRepository {
	async saveAddress(address: Address): Promise<Address> {
		const addressSchema = AddressSchemaEntityMapper.entityToSchema(address);
		const savedAddress = await addressSchema.save();
		return AddressSchemaEntityMapper.schemaToEntity(savedAddress);
	}

	async findOneAddressById(addressId: string): Promise<Address | null> {
		const address = await AddressSchema.findOne({
			where: { id: addressId },
		});
		if (!address) return null;
		return AddressSchemaEntityMapper.schemaToEntity(address);
	}

	async findAddressesByUserId(userId: string): Promise<Address[]> {
		const addressSchemas = await AddressSchema.findAll({
			where: { userId: userId },
		});
		return AddressSchemaEntityMapper.schemasToEntities(addressSchemas);
	}
}
