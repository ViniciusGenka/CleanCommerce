import User from '../../domain/entities/user';
import { UserUpdateDTO } from '../../domain/dtos/user/userUpdateDTO';

export default interface UserRepository {
	saveUser(user: User): Promise<User>;
	findOneUserById(userId: string): Promise<User | null>;
	findOneUserByEmail(email: string): Promise<User | null>;
	findOneUserByIdAndUpdate(
		update: UserUpdateDTO,
		userId: string
	): Promise<User>;
	emailAlreadyInUse(email: string): Promise<boolean>;
}
