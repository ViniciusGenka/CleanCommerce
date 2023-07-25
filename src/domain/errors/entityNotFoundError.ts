import CustomError from './customDomainError';

export default class EntityNotFoundError extends CustomError {
	constructor(message: string) {
		super(message, 404);
	}
}
