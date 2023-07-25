import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import HashUserPassword from '../../../application/services/hashUserPasswordService';

@injectable()
export default class HashUserPasswordServiceWithBcrypt
	implements HashUserPassword
{
	async execute(password: string): Promise<string> {
		return bcrypt.hash(password, await bcrypt.genSalt());
	}
}
