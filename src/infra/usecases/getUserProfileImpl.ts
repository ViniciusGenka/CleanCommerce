import UserRepository from '../../application/repositories/userRepository';
import { UserDTO } from '../../domain/dtos/user/userDTO';
import UserMapper from '../../application/mappers/userMapper';
import GetUserProfile from '../../application/usecases/getUserProfile';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class GetUserProfileImpl implements GetUserProfile {
	private userRepository: UserRepository;
	constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
	async execute(userId: string): Promise<UserDTO> {
		const userEntity = await this.userRepository.findOneUserById(userId);
		if (!userEntity) throw new EntityNotFoundError("User not found")
		return UserMapper.execute(userEntity);
	}
}
