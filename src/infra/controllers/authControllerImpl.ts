import UserSignIn from '../../application/usecases/userSignIn';
import UserSignUp from '../../application/usecases/userSignUp';
import { UserDTO } from '../../domain/dtos/user/userDTO';
import { UserSignUpDTO } from '../../domain/dtos/user/userSignUpDTO';
import { UserSignInDTO } from '../../domain/dtos/user/userSignInDTO';
import AuthController from '../../application/controllers/authController';
import { inject, injectable } from 'inversify';
import { TYPES } from '../configs/inversify.types';

@injectable()
export default class AuthControllerImpl implements AuthController {
	private userSignInUseCase: UserSignIn;
	private userSignUpUseCase: UserSignUp;

	constructor(
		@inject(TYPES.UserSignIn) userSignInUseCase: UserSignIn,
		@inject(TYPES.UserSignUp) userSignUpUseCase: UserSignUp
	) {
		this.userSignInUseCase = userSignInUseCase;
		this.userSignUpUseCase = userSignUpUseCase;
	}

	userSignIn = async (params: any, body: UserSignInDTO): Promise<string> => {
		const userSignInData = body;
		return this.userSignInUseCase.execute(userSignInData);
	};

	userSignUp = async (params: any, body: UserSignUpDTO): Promise<UserDTO> => {
		const userData = body;
		return this.userSignUpUseCase.execute(userData);
	};
}
