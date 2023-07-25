import { injectable } from 'inversify';
import Joi from 'joi';
import PostalCodeValidator from '../../application/validators/postalCodeValidator';
import CustomError from '../../application/errors/customApplicationError';

@injectable()
export class BrazillianPostalCodeValidatorWithJoi implements PostalCodeValidator {
    validate(postalCode: string): void {
        const schema = Joi.string().pattern(/^\d{5}-\d{3}$/);
        const { error } = schema.validate(postalCode);

        if (error) throw new CustomError('Rating must be a number between 0 and 5', 400);
    }
}
