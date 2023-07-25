import { injectable } from 'inversify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UnauthorizedError from '../../../application/errors/unauthorizedError';
import VerifyAccessTokenService from '../../../application/services/verifyAccessTokenService';

@injectable()
export default class VerifyAccessTokenServiceWithJWT
	implements VerifyAccessTokenService {
	execute(token: string): string | JwtPayload {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			throw new UnauthorizedError('Invalid token');
		}
	}
}
