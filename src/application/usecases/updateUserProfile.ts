import { UserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';
import { UserDTO } from '../../domain/dtos/user/userDTO';

export default interface UpdateUserProfile {
	execute(update: UserUpdateDTO, userId: string): Promise<UserDTO>;
}
