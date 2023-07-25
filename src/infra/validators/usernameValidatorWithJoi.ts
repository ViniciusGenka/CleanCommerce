import { injectable } from 'inversify';
import Joi from 'joi';
import UsernameValidator from '../../application/validators/usernameValidator';
import CustomError from '../../application/errors/customApplicationError';

@injectable()
export class UsernameValidatorWithJoi implements UsernameValidator {
	validate(name: string): void {
		const schema = Joi.string()
			.min(4)
			.max(32)
			.pattern(/^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*$/);
		const { error } = schema.validate(name);

		if (error) throw new CustomError('Invalid username', 400);
	}
}
