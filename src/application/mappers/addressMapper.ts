import Address from '../../domain/entities/address';
import { AddressDTO } from '../../domain/dtos/address/addressDTO';

export default class AddressMapper {
	static execute(addressEntity: Address): AddressDTO {
		return {
			id: addressEntity.id,
			contactFullName: addressEntity.contactFullName,
			contactPhoneNumber: addressEntity.contactPhoneNumber,
			postalCode: addressEntity.postalCode,
			state: addressEntity.state,
			city: addressEntity.city,
			neighborhood: addressEntity.neighborhood,
			street: addressEntity.street,
			streetNumber: addressEntity.streetNumber,
			complement: addressEntity.complement,
		};
	}
}
