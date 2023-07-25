import { injectable } from 'inversify';
import Joi from 'joi';
import PasswordValidator from '../../application/validators/passwordValidator';
import CustomError from '../../application/errors/customApplicationError';

@injectable()
export class PasswordValidatorWithJoi implements PasswordValidator {
	validate(password: string): void {
		const schema = Joi.string()
			.min(8)
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]*$/)
			.required();
		const { error } = schema.validate(password);
		if (error) throw new CustomError('Invalid password', 400);
	}
}
