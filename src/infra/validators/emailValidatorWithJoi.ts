import { injectable } from 'inversify';
import Joi from 'joi';
import EmailValidator from '../../application/validators/emailValidator';
import CustomError from '../../application/errors/customApplicationError';

@injectable()
export class EmailValidatorWithJoi implements EmailValidator {
	validate(email: string): void {
		const schema = Joi.string().email();
		const { error } = schema.validate(email);

		if (error) throw new CustomError('Invalid email', 400);
	}
}
