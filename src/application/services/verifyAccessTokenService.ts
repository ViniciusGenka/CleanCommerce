export default interface VerifyAccessTokenService {
	execute(token: string): string | object;
}
