import { injectable } from 'inversify';
import { UserUpdateDTO } from '../../../../domain/dtos/user/userUpdateDTO';
import User from '../../../../domain/entities/user';
import EntityNotFoundError from '../../../../domain/errors/entityNotFoundError';
import UserRepository from '../../../../application/repositories/userRepository';
import { UserSchemaEntityMapper } from '../mappers/userSchemaEntityMapper';
import { UserSchema } from '../schemas/userSchema';
import { UserRolesSchema } from '../schemas/userRolesSchema';
import { RoleSchema } from '../schemas/roleSchema';
import { Role } from '../../../../domain/enums/role';

@injectable()
export default class UserRepositoryWithSequelizeAndMysql
	implements UserRepository {
	async saveUser(user: User): Promise<User> {
		const customerRole = await RoleSchema.findOne({ where: { name: Role.CUSTOMER } })
		const userSchema = UserSchemaEntityMapper.entityToSchema(user);
		const savedUser = await userSchema.save();
		const userRoleSchema = UserRolesSchema.build({
			userId: savedUser.id,
			roleId: customerRole.id
		})
		await userRoleSchema.save();
		return UserSchemaEntityMapper.schemaToEntity(savedUser);
	}

	async findOneUserById(userId: string): Promise<User | null> {
		const user = await UserSchema.findOne({
			where: { id: userId },
			include: [
				{
					model: RoleSchema,
					as: "roles"
				}
			]
		});
		if (!user) return null;
		return UserSchemaEntityMapper.schemaToEntity(user);
	}

	async findOneUserByEmail(email: string): Promise<User | null> {
		const user = await UserSchema.findOne({ where: { email: email } });
		if (!user) return null;
		return UserSchemaEntityMapper.schemaToEntity(user);
	}

	async findOneUserByIdAndUpdate(
		update: UserUpdateDTO,
		userId: string
	): Promise<User> {
		const updateSucceeded = await UserSchema.update(update, {
			where: { id: userId },
		});
		if (!updateSucceeded) throw new EntityNotFoundError('User not found');
		const updatedUser = await UserSchema.findOne({ where: { id: userId } });
		return UserSchemaEntityMapper.schemaToEntity(updatedUser);
	}

	async emailAlreadyInUse(email: string): Promise<boolean> {
		const user = await UserSchema.findOne({ where: { email: email } });
		return user != null;
	}
}
