export default interface HashUserPasswordService {
	execute(userPassword: string): Promise<string>;
}
