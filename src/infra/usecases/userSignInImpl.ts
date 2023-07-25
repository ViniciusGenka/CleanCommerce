import CompareUserPasswordsService from '../../application/services/compareUserPasswordsService';
import GenerateAccessTokenService from '../../application/services/generateAccessTokenService';
import UnauthorizedError from '../../application/errors/unauthorizedError';
import UserRepository from '../../application/repositories/userRepository';
import { UserSignInDTO } from '../../domain/dtos/user/userSignInDTO';
import UserSignIn from '../../application/usecases/userSignIn';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';
import EntityNotFoundError from '../../domain/errors/entityNotFoundError';

@injectable()
export default class UserSignInImpl implements UserSignIn {
	public generateAccessTokenService: GenerateAccessTokenService;
	private compareUserPasswordsService: CompareUserPasswordsService;
	private userRepository: UserRepository;

	constructor(
		@inject(TYPES.CompareUserPasswordsService)
		compareUserPasswordsService: CompareUserPasswordsService,
		@inject(TYPES.GenerateAccessTokenService)
		generateAccessTokenService: GenerateAccessTokenService,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.compareUserPasswordsService = compareUserPasswordsService;
		this.generateAccessTokenService = generateAccessTokenService;
		this.userRepository = userRepository;
	}

	async execute(userSignInData: UserSignInDTO): Promise<string> {
		const userEntity = await this.userRepository.findOneUserByEmail(
			userSignInData.email
		);
		if (!userEntity) throw new EntityNotFoundError("User not found")
		const passwordIsIncorrect =
			!(await this.compareUserPasswordsService.execute(
				userSignInData.password,
				userEntity.password
			));
		if (passwordIsIncorrect) throw new UnauthorizedError('Incorrect password');
		const payload = {
			username: userEntity.name,
			userId: userEntity.id,
		};
		return this.generateAccessTokenService.execute(payload);
	}
}
