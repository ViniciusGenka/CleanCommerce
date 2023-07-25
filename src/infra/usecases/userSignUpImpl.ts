import HashUserPasswordService from '../../application/services/hashUserPasswordService';
import UserMapper from '../../application/mappers/userMapper';
import UserRepository from '../../application/repositories/userRepository';
import { UserSignUpDTO } from '../../domain/dtos/user/userSignUpDTO';
import { UserDTO } from '../../domain/dtos/user/userDTO';
import UserSignUp from '../../application/usecases/userSignUp';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import User from '../../domain/entities/user';
import EmailValidator from '../../application/validators/emailValidator';
import PasswordValidator from '../../application/validators/passwordValidator';
import UsernameValidator from '../../application/validators/usernameValidator';
import { Role } from '../../domain/enums/role';
import RoleRepository from '../../application/repositories/roleRepository';

@injectable()
export default class UserSignUpImpl implements UserSignUp {
	private emailValidator: EmailValidator;
	private hashUserPasswordService: HashUserPasswordService;
	private passwordValidator: PasswordValidator;
	private roleRepository: RoleRepository;
	private usernameValidator: UsernameValidator;
	private userRepository: UserRepository;

	constructor(
		@inject(TYPES.EmailValidator) emailValidator: EmailValidator,
		@inject(TYPES.HashUserPasswordService)
		hashUserPasswordService: HashUserPasswordService,
		@inject(TYPES.PasswordValidator) passwordValidator: PasswordValidator,
		@inject(TYPES.RoleRepository) roleRepository: RoleRepository,
		@inject(TYPES.UsernameValidator) usernameValidator: UsernameValidator,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.emailValidator = emailValidator;
		this.hashUserPasswordService = hashUserPasswordService;
		this.passwordValidator = passwordValidator;
		this.roleRepository = roleRepository;
		this.usernameValidator = usernameValidator;
		this.userRepository = userRepository;
	}

	async execute(userData: UserSignUpDTO): Promise<UserDTO> {
		this.usernameValidator.validate(userData.name);
		this.emailValidator.validate(userData.email);
		this.passwordValidator.validate(userData.password);
		const emailAlreadyInUse = await this.userRepository.emailAlreadyInUse(
			userData.email
		);
		if (emailAlreadyInUse) throw new Error('Email is already in use');
		userData.password = await this.hashUserPasswordService.execute(
			userData.password
		);
		const userEntity = new User(
			userData.email,
			userData.name,
			userData.password
		);
		const savedUser = await this.userRepository.saveUser(userEntity);
		return UserMapper.execute(savedUser);
	}
}
