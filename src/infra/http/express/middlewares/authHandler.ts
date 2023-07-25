import UnauthorizedError from '../../../../application/errors/unauthorizedError';
import VerifyAccessTokenService from '../../../../application/services/verifyAccessTokenService';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configs/inversify.types';
import UserRepository from '../../../../application/repositories/userRepository';
import EntityNotFoundError from '../../../../domain/errors/entityNotFoundError';

@injectable()
export default class AuthHandler {
	private verifyAccessTokenService: VerifyAccessTokenService;
	private userRepository: UserRepository;
	constructor(
		@inject(TYPES.VerifyAccessTokenService)
		verifyAccessTokenService: VerifyAccessTokenService,
		@inject(TYPES.UserRepository) userRepository: UserRepository
	) {
		this.verifyAccessTokenService = verifyAccessTokenService;
		this.userRepository = userRepository;
	}

	execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const authHeader = req.headers['authorization'];
			const authToken = authHeader && authHeader.split(' ')[1];
			if (authToken == null) {
				throw new UnauthorizedError(
					'Authorization token must be provided in the authorization header'
				);
			}
			const payload = this.verifyAccessTokenService.execute(authToken) as { userId: string, username: string };
			if (!payload) throw new UnauthorizedError('Invalid authorization token');
			const user = await this.userRepository.findOneUserById(payload.userId)
			if (!user) throw new EntityNotFoundError("User not found");
			console.log(user.roles)
			res.locals.payload = payload;
			res.locals.roles = user.roles;
			next();
		} catch (err) {
			next(err);
		}
	};
}



// import UnauthorizedError from '../../../../application/errors/unauthorizedError';
// import VerifyAccessTokenService from '../../../../application/services/verifyAccessTokenService';
// import { NextFunction, Request, Response } from 'express';
// import { inject, injectable } from 'inversify';
// import { TYPES } from '../../../configs/inversify.types';
// import { container } from '../../../configs/inversify.config';
// import UserRepository from '../../../../application/repositories/userRepository';

// @injectable()
// export default class AuthHandler {
// 	private verifyAccessTokenService: VerifyAccessTokenService;
// 	constructor(
// 		@inject(TYPES.VerifyAccessTokenService)
// 		verifyAccessTokenService: VerifyAccessTokenService,
// 	) {
// 		this.verifyAccessTokenService = verifyAccessTokenService;
// 	}

// 	execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
// 		try {
// 			const authHeader = req.headers['authorization'];
// 			const authToken = authHeader && authHeader.split(' ')[1];
// 			if (authToken == null) {
// 				throw new UnauthorizedError(
// 					'Authorization token must be provided in the authorization header'
// 				);
// 			}
// 			const payload = this.verifyAccessTokenService.execute(authToken);
// 			if (!payload) throw new UnauthorizedError('Invalid authorization token');
// 			res.locals.payload = payload;
// 			next();
// 		} catch (err) {
// 			next(err);
// 		}
// 	};
// }
