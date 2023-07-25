import Address from '../../../../domain/entities/address';
import { AddressSchema } from '../schemas/addressSchema';

export class AddressSchemaEntityMapper {
	static schemaToEntity(AddressSchema: AddressSchema): Address {
		return new Address(
			AddressSchema.city,
			AddressSchema.complement,
			AddressSchema.contactFullName,
			AddressSchema.contactPhoneNumber,
			AddressSchema.neighborhood,
			AddressSchema.postalCode,
			AddressSchema.state,
			AddressSchema.street,
			AddressSchema.streetNumber,
			AddressSchema.userId,
			AddressSchema.id
		);
	}

	static entityToSchema(AddressEntity: Address): AddressSchema {
		return AddressSchema.build({
			contactFullName: AddressEntity.contactFullName,
			contactPhoneNumber: AddressEntity.contactPhoneNumber,
			postalCode: AddressEntity.postalCode,
			state: AddressEntity.state,
			city: AddressEntity.city,
			complement: AddressEntity.complement,
			neighborhood: AddressEntity.neighborhood,
			street: AddressEntity.street,
			streetNumber: AddressEntity.streetNumber,
			userId: AddressEntity.userId,
		});
	}

	static schemasToEntities(addressSchemas: AddressSchema[]): Address[] {
		let addressEntities: Address[] = [];
		for (let i = 0; i < addressSchemas.length; i++) {
			const addressEntity = new Address(
				addressSchemas[i].city,
				addressSchemas[i].complement,
				addressSchemas[i].contactFullName,
				addressSchemas[i].contactPhoneNumber,
				addressSchemas[i].neighborhood,
				addressSchemas[i].postalCode,
				addressSchemas[i].state,
				addressSchemas[i].street,
				addressSchemas[i].streetNumber,
				addressSchemas[i].userId,
				addressSchemas[i].id
			);
			addressEntities.push(addressEntity);
		}
		return addressEntities;
	}
}
