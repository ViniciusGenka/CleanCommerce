import { UserSignInDTO } from '../../domain/dtos/user/userSignInDTO';

export default interface UserSignIn {
	execute(userSignInData: UserSignInDTO): Promise<string>;
}
