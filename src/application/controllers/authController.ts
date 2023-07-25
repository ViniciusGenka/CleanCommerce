import { UserDTO } from '../../domain/dtos/user/userDTO';
import { UserSignUpDTO } from '../../domain/dtos/user/userSignUpDTO';
import { UserSignInDTO } from '../../domain/dtos/user/userSignInDTO';

export default interface AuthController {
	userSignIn(params: any, body: UserSignInDTO): Promise<string>;

	userSignUp(params: any, body: UserSignUpDTO): Promise<UserDTO>;
}
