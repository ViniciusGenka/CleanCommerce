import UserMapper from '../../application/mappers/userMapper';
import UserRepository from '../../application/repositories/userRepository';
import { UserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';
import { UserDTO } from '../../domain/dtos/user/userDTO';
import UpdateUserProfile from '../../application/usecases/updateUserProfile';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';
import EmailValidator from '../../application/validators/emailValidator';
import HashUserPasswordService from '../../application/services/hashUserPasswordService';
import PasswordValidator from '../../application/validators/passwordValidator';
import UsernameValidator from '../../application/validators/usernameValidator';

@injectable()
export default class UpdateUserProfileImpl implements UpdateUserProfile {
	private emailValidator: EmailValidator;
	private hashUserPasswordService: HashUserPasswordService;
	private passwordValidator: PasswordValidator;
	private usernameValidator: UsernameValidator;
	private userRepository: UserRepository;

	constructor(
		@inject(TYPES.EmailValidator) emailValidator: EmailValidator,
		@inject(TYPES.HashUserPasswordService)
		hashUserPasswordService: HashUserPasswordService,
		@inject(TYPES.PasswordValidator) passwordValidator: PasswordValidator,
		@inject(TYPES.UsernameValidator) usernameValidator: UsernameValidator,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.emailValidator = emailValidator;
		this.hashUserPasswordService = hashUserPasswordService;
		this.passwordValidator = passwordValidator;
		this.usernameValidator = usernameValidator;
		this.userRepository = userRepository;
	}

	async execute(update: UserUpdateDTO, userId: string): Promise<UserDTO> {
		if (update.name) this.usernameValidator.validate(update.name);
		if (update.email) this.emailValidator.validate(update.email);
		if (update.password) {
			this.passwordValidator.validate(update.password);
			update.password = await this.hashUserPasswordService.execute(
				update.password
			);
		};
		const updatedUserEntity =
			await this.userRepository.findOneUserByIdAndUpdate(update, userId);
		if (!updatedUserEntity) throw new EntityNotFoundError("User not found")
		return UserMapper.execute(updatedUserEntity);
	}
}
