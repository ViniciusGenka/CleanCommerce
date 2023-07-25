import GenerateAccessTokenService from '../../../application/services/generateAccessTokenService';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';

@injectable()
export default class GenerateAccessTokenServiceWithJWT
	implements GenerateAccessTokenService {
	execute(payload: object): string {
		return jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION_TIME,
		});
	}
}
