import { Request, Response, NextFunction } from 'express';

export default class ExpressErrorHandler {
	static execute(error: any, req: Request, res: Response, next: NextFunction) {
		const statusCode = error.statusCode || 500;
		const message = error.message || 'Internal Server Error';
		console.log(`An error occurred: ${error.stack}`)
		return res.status(statusCode).json({ message: message });
	}
}
