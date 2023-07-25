import { UserDTO } from '../../domain/dtos/user/userDTO';

export default interface GetUserProfile {
	execute(userId: string): Promise<UserDTO>;
}
