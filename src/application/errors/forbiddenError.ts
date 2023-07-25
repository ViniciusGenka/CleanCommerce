import CustomError from './customApplicationError';

export default class ForbiddenError extends CustomError {
	constructor(message: string) {
		super(message, 403);
	}
}
