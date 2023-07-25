import { AddressDTO } from '../../domain/dtos/address/addressDTO';
import { CreateAddressDTO } from '../../domain/dtos/address/createAddressDTO';

export default interface AddUserAddress {
	execute(addressData: CreateAddressDTO, userId: string): Promise<AddressDTO>;
}
