export default interface CompareUserPasswordsService {
	execute(candidatePassword: string, hashedPassword: string): Promise<boolean>;
}
