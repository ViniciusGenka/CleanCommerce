import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import CompareUserPasswords from '../../../application/services/compareUserPasswordsService';

@injectable()
export default class CompareUserPasswordsServiceWithBcrypt
	implements CompareUserPasswords
{
	async execute(
		candidatePassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return bcrypt.compare(candidatePassword, hashedPassword);
	}
}
