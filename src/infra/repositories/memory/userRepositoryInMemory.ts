import User from '../../../domain/entities/user';
import UserRepository from '../../../application/repositories/userRepository';
import crypto from 'crypto';
import EntityNotFoundError from '../../../domain/errors/entityNotFoundError';
import { UserUpdateDTO } from '../../../domain/dtos/user/userUpdateDTO';
import { injectable } from 'inversify';

@injectable()
export default class UserRepositoryInMemory implements UserRepository {
	public users: User[] = [];

	async saveUser(user: User): Promise<User> {
		user.id = crypto.randomUUID();
		this.users.push(user);
		return user;
	}

	async findOneUserById(userId: string): Promise<User> {
		if (this.users.length === 0)
			throw new EntityNotFoundError('No users found');
		return this.users.find((user) => user.id === userId);
	}

	async findOneUserByEmail(email: string): Promise<User> {
		if (this.users.length === 0)
			throw new EntityNotFoundError('No users found');
		return this.users.find((user) => user.email === email);
	}

	async findOneUserByIdAndUpdate(
		update: UserUpdateDTO,
		userId: string
	): Promise<User> {
		const indexOfUser = this.users.findIndex((user) => user.id === userId);
		const updatedUser = Object.assign(this.users[indexOfUser], update);
		this.users[indexOfUser] = updatedUser;
		return this.users[indexOfUser];
	}
}
