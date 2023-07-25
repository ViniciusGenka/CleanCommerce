import User from '../../../../domain/entities/user';
import { UserSchema } from '../schemas/userSchema';

export class UserSchemaEntityMapper {
	static schemaToEntity(userSchema: UserSchema): User {
		return new User(
			userSchema.email,
			userSchema.name,
			userSchema.password,
			userSchema.roles,
			userSchema.id
		);
	}

	static entityToSchema(UserEntity: User): UserSchema {
		return UserSchema.build({
			name: UserEntity.name,
			email: UserEntity.email,
			password: UserEntity.password,
		});
	}
}
