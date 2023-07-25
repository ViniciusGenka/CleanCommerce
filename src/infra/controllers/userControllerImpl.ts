import { inject, injectable } from 'inversify';
import UserController from '../../application/controllers/userController';
import AddUserAddress from '../../application/usecases/addUserAddress';
import GetUserAddresses from '../../application/usecases/getUserAddresses';
import GetUserOrders from '../../application/usecases/getUserOrders';
import GetUserProfile from '../../application/usecases/getUserProfile';
import UpdateUserProfile from '../../application/usecases/updateUserProfile';
import { AddressDTO } from '../../domain/dtos/address/addressDTO';
import { OrderDTO } from '../../domain/dtos/order/orderDTO';
import { UserDTO } from '../../domain/dtos/user/userDTO';
import { UserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';
import { TYPES } from '../configs/inversify.types';
import { UserRoleAssociationDTO } from '../../domain/dtos/user/userRoleAssociationDTO';
import AddRolesToUsers from '../../application/usecases/addRolesToUsers';

@injectable()
export default class UserControllerImpl implements UserController {
	private addRolesToUsersUseCase: AddRolesToUsers;
	private addUserAddressUseCase: AddUserAddress;
	private getUserAddressesUseCase: GetUserAddresses;
	private getUserOrdersUseCase: GetUserOrders;
	private getUserProfileUseCase: GetUserProfile;
	private updateUserProfileUseCase: UpdateUserProfile;

	constructor(
		@inject(TYPES.AddRolesToUsers) addRolesToUsersUseCase: AddRolesToUsers,
		@inject(TYPES.AddUserAddress) addUserAddressUseCase: AddUserAddress,
		@inject(TYPES.GetUserAddresses)
		getUserAddressesUseCase: GetUserAddresses,
		@inject(TYPES.GetUserOrders) getUserOrdersUseCase: GetUserOrders,
		@inject(TYPES.GetUserProfile) getUserProfileUseCase: GetUserProfile,
		@inject(TYPES.UpdateUserProfile)
		updateUserProfileUseCase: UpdateUserProfile
	) {
		this.addRolesToUsersUseCase = addRolesToUsersUseCase;
		this.addUserAddressUseCase = addUserAddressUseCase;
		this.getUserAddressesUseCase = getUserAddressesUseCase;
		this.getUserOrdersUseCase = getUserOrdersUseCase;
		this.getUserProfileUseCase = getUserProfileUseCase;
		this.updateUserProfileUseCase = updateUserProfileUseCase;
	}

	addRolesToUsers = async (params: any, body: { userRoleAssociations: UserRoleAssociationDTO[]; }): Promise<void> => {
		return this.addRolesToUsersUseCase.execute(body.userRoleAssociations);
	}

	addUserAddress = (params: any, body: AddressDTO): Promise<AddressDTO> => {
		const userId = params.userId;
		return this.addUserAddressUseCase.execute(body, userId);
	};

	getUserAddresses = (params: any, body: AddressDTO): Promise<AddressDTO[]> => {
		const userId = params.userId;
		return this.getUserAddressesUseCase.execute(userId);
	};

	getUserOrders = (params: any, body: any): Promise<OrderDTO[]> => {
		const userId = params.userId;
		return this.getUserOrdersUseCase.execute(userId);
	};

	getUserProfile = (params: any, body: any): Promise<UserDTO> => {
		const userId = params.userId;
		return this.getUserProfileUseCase.execute(userId);
	};

	updateUserProfile = (params: any, body: UserUpdateDTO): Promise<UserDTO> => {
		const userId = params.userId;
		const update = body;
		return this.updateUserProfileUseCase.execute(update, userId);
	};
}
