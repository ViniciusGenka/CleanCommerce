import { UserSignUpDTO } from '../../domain/dtos/user/userSignUpDTO';
import { UserDTO } from '../../domain/dtos/user/userDTO';

export default interface UserSignUp {
	execute(userData: UserSignUpDTO): Promise<UserDTO>;
}
