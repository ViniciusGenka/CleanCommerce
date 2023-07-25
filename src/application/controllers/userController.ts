import { AddressDTO } from '../../domain/dtos/address/addressDTO';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import { UserDTO } from '../../domain/dtos/user/userDTO';
import { UserRoleAssociationDTO } from '../../domain/dtos/user/userRoleAssociationDTO';
import { UserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';

export default interface UserController {
	addUserAddress(params: any, body: AddressDTO): Promise<AddressDTO>;
	addRolesToUsers(params: any, body: { userRoleAssociations: UserRoleAssociationDTO[] }): Promise<void>;
	getUserAddresses(params: any, body: AddressDTO): Promise<AddressDTO[]>;
	getUserOrders(params: any, body: any): Promise<OrderDTO[]>;
	getUserProfile(params: any, body: any): Promise<UserDTO>;
	updateUserProfile(params: any, body: UserUpdateDTO): Promise<UserDTO>;
}
