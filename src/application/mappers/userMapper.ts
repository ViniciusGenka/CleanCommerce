import User from '../../domain/entities/user';
import { UserDTO } from '../../domain/dtos/user/userDTO';

export default class UserMapper {
	static execute(userEntity: User): UserDTO {
		return {
			id: userEntity.id,
			name: userEntity.name,
			email: userEntity.email,
		};
	}
}
