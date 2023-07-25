import { AddressDTO } from '../../domain/dtos/address/addressDTO';

export default interface GetUserAddresses {
	execute(userId: string): Promise<AddressDTO[]>;
}
