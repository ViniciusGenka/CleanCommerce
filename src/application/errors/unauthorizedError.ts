import CustomError from './customApplicationError';

export default class UnauthorizedError extends CustomError {
	constructor(message: string) {
		super(message, 401);
	}
}
