export default interface GenerateAccessTokenService {
	execute(payload: { username: string, userId: string }): string;
}
